# AWS Interview Q&A (Senior Software Developer)

This document contains advanced AWS interview questions tailored for Senior Software Developers and Cloud Architects.

## Architecture & Compute

### 1. How would you choose between EC2, ECS, EKS, and AWS Lambda for a new microservices architecture?
- **EC2:** Use when you need full OS-level control, custom kernels, or are migrating legacy apps. Highest operational overhead.
- **ECS (Elastic Container Service):** Best for a simple, AWS-native container orchestration experience. Great if you don't need the complexity of Kubernetes and want tight integration with AWS IAM and ALB.
- **EKS (Elastic Kubernetes Service):** Choose when you need cloud-agnostic container orchestration, have existing Kubernetes expertise, or require the massive ecosystem of Kubernetes tools (Helm, Istio, etc.).
- **Lambda (Serverless):** Best for event-driven workloads, unpredictable traffic, and minimizing operational overhead. You pay only for compute time. However, you must manage cold starts and runtime limits (15 mins).

### 2. How do you mitigate "cold starts" in AWS Lambda?
Cold starts happen when a new instance of a Lambda function is initialized. To mitigate:
- **Provisioned Concurrency:** Keeps a specified number of execution environments initialized and ready to respond immediately.
- **Language Choice:** Languages like Node.js and Python start much faster than Java or .NET.
- **Optimize Dependencies:** Keep the deployment package small. Load only required SDK modules rather than the entire AWS SDK.
- **Increase Memory:** Allocating more memory to a Lambda function proportionally increases its CPU power, which can speed up the initialization phase.

## Databases & Storage

### 3. When would you choose DynamoDB over Amazon Aurora / RDS?
- **DynamoDB (NoSQL):** Choose when you need single-digit millisecond latency at any scale, have a highly predictable access pattern, require a schemaless design, or are building a serverless app. It excels at key-value and document data structures.
- **Aurora/RDS (Relational):** Choose when your data is highly structured, you need complex JOIN operations, require ACID transactions across multiple tables, or your access patterns are unpredictable (ad-hoc queries).

### 4. Explain the difference between S3 Standard, S3 Standard-IA, and S3 Glacier.
- **S3 Standard:** For frequently accessed data. High durability, high availability, low latency.
- **S3 Standard-IA (Infrequent Access):** For data accessed less than once a month but requires rapid access when needed. Lower storage cost but charges a retrieval fee.
- **S3 Glacier (Flexible / Deep Archive):** For long-term archiving and compliance. Extremely low storage cost, but retrieval times range from minutes to hours.

## Messaging & Event-Driven Architecture

### 5. What is the difference between SQS, SNS, and EventBridge?
- **SQS (Simple Queue Service):** A message queue used to decouple components. It uses a **pull/poll** model. Good for buffering requests, asynchronous processing, and ensuring messages are processed exactly once (FIFO queues).
- **SNS (Simple Notification Service):** A pub/sub messaging service using a **push** model. A single message published to an SNS topic is pushed to multiple subscribers (SQS, Lambda, HTTP endpoints).
- **EventBridge:** An enterprise service bus built on top of CloudWatch Events. It's designed for event-driven architectures to route events between AWS services, custom apps, and third-party SaaS applications via a central event bus.

## Security & Networking

### 6. What is the difference between an IAM Role and a Resource-Based Policy?
- **IAM Role:** An identity with specific permissions that can be assumed by a user, application, or AWS service (e.g., granting an EC2 instance access to an S3 bucket). It relies on identity-based policies.
- **Resource-Based Policy:** A policy attached directly to a resource (like an S3 Bucket Policy or an SQS Queue Policy) that dictates *who* can access the resource and *what* they can do.

### 7. How would you secure a web application deployed on AWS?
A senior developer should mention defense in depth:
- **Edge:** Use CloudFront and AWS WAF (Web Application Firewall) to block SQLi, XSS, and DDoS attacks.
- **Network:** Place the database and backend application servers in Private Subnets. Use a Public Subnet only for Load Balancers (ALB) and Bastion Hosts. Restrict Security Group rules.
- **Data:** Enable encryption at rest (KMS for RDS, S3) and in transit (TLS/SSL via ACM).
- **Access:** Follow the principle of least privilege using IAM. Never hardcode AWS credentials; use IAM Roles for EC2/ECS/Lambda.

## High Availability & CI/CD

### 8. How do you design an active-active Multi-Region architecture on AWS?
1. **DNS:** Use Route 53 with latency-based or geolocation routing policies to direct users to the closest region.
2. **Compute:** Deploy independent stacks (ALB + ECS/EKS/EC2) in both regions.
3. **Database:** Use DynamoDB Global Tables or Aurora Global Database for cross-region replication.
4. **Storage:** Use S3 Cross-Region Replication (CRR).
This ensures that if one region goes down, Route 53 routes traffic to the healthy region, and the data is already synced.

### 9. Terraform vs AWS CloudFormation vs AWS CDK?
- **CloudFormation:** AWS native, uses JSON/YAML. State is managed by AWS. Good for pure AWS environments.
- **Terraform:** Cloud-agnostic, uses HCL. Manages state via state files. Has a massive ecosystem of providers (AWS, Datadog, GitHub, etc.). Often preferred in multi-cloud or hybrid setups.
- **AWS CDK (Cloud Development Kit):** Allows you to write IaC using familiar programming languages (TypeScript, Python, Java). It synthesizes down to CloudFormation templates. Excellent for developers who want to use standard software engineering practices (loops, conditionals, testing) for infrastructure.
