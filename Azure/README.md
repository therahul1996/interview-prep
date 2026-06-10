# Azure Interview Q&A (Senior Software Developer)

### Table of Contents

| No. | Questions |
|---- | --------- |
| 1 | [How do you choose between Azure App Service, Azure Kubernetes Service (AKS), and Azure Functions?](#1-how-do-you-choose-between-azure-app-service-azure-kubernetes-service-aks-and-azure-functions) |
| 2 | [How do you handle cold starts in Azure Functions?](#2-how-do-you-handle-cold-starts-in-azure-functions) |
| 3 | [When should you use Cosmos DB vs Azure SQL Database?](#3-when-should-you-use-cosmos-db-vs-azure-sql-database) |
| 4 | [What are the different Azure Blob Storage tiers?](#4-what-are-the-different-azure-blob-storage-tiers) |
| 5 | [Explain the difference between Azure Service Bus, Event Grid, and Event Hubs.](#5-explain-the-difference-between-azure-service-bus-event-grid-and-event-hubs) |
| 6 | [What is the difference between a Managed Identity and a Service Principal?](#6-what-is-the-difference-between-a-managed-identity-and-a-service-principal) |
| 7 | [How would you secure a public-facing API in Azure?](#7-how-would-you-secure-a-publicfacing-api-in-azure) |
| 8 | [What is the difference between Availability Zones and Region Pairs in Azure?](#8-what-is-the-difference-between-availability-zones-and-region-pairs-in-azure) |
| 9 | [Compare ARM Templates, Bicep, and Terraform for Azure IaC.](#9-compare-arm-templates-bicep-and-terraform-for-azure-iac) |


This document contains advanced Azure interview questions tailored for Senior Software Developers and Cloud Architects.

## Architecture & Compute

### 1. How do you choose between Azure App Service, Azure Kubernetes Service (AKS), and Azure Functions?
- **Azure App Service:** Best for hosting web applications, REST APIs, and mobile backends. It is a fully managed PaaS offering built-in auto-scaling, CI/CD integration, and custom domains. Ideal for traditional monolithic apps or simple microservices.
- **Azure Kubernetes Service (AKS):** Best for complex microservices architectures that require container orchestration, advanced networking (service mesh), or multi-cloud flexibility. Steeper learning curve but massive ecosystem.
- **Azure Functions (Serverless):** Best for event-driven microservices, background tasks, and unpredictable traffic patterns. You pay only for the compute time used.

### 2. How do you handle cold starts in Azure Functions?
- **Premium Plan:** Switch from the Consumption plan to the Premium plan, which offers pre-warmed instances to eliminate cold starts while still providing dynamic scaling.
- **Run From Package:** Deploying the function app to run directly from a ZIP file can significantly reduce cold start times.
- **Language Choice:** Compiled languages like C# (in-process) or lightweight runtimes like Node.js often start faster than Java.
- **Keep it lightweight:** Reduce the number of dependencies and the initialization logic required during startup.

## Databases & Storage

### 3. When should you use Cosmos DB vs Azure SQL Database?
- **Cosmos DB:** A globally distributed, multi-model NoSQL database. Use it when you need single-digit millisecond latency at the 99th percentile, planet-scale horizontal scaling, or support for multiple APIs (SQL, MongoDB, Cassandra, Gremlin). Ideal for highly responsive web/mobile apps, gaming, and IoT.
- **Azure SQL Database:** A fully managed relational database based on SQL Server. Use it when your data is highly structured, relies on complex ACID transactions, requires complex relational joins, or you are migrating existing SQL Server workloads.

### 4. What are the different Azure Blob Storage tiers?
- **Hot Tier:** Optimized for storing data that is accessed frequently. Highest storage costs, lowest access costs.
- **Cool Tier:** Optimized for storing data that is infrequently accessed and stored for at least 30 days. Lower storage costs, higher access costs than Hot.
- **Cold Tier:** Optimized for storing data that is infrequently accessed and stored for at least 90 days.
- **Archive Tier:** Optimized for data that is rarely accessed and stored for at least 180 days with flexible latency requirements (retrieval takes hours). Lowest storage costs, highest data retrieval costs.

## Messaging & Event-Driven Architecture

### 5. Explain the difference between Azure Service Bus, Event Grid, and Event Hubs.
- **Azure Service Bus:** A highly reliable enterprise message broker. It supports complex messaging features like transactions, message ordering (FIFO), sessions, and dead-lettering. Used for high-value enterprise transactions (e.g., financial orders).
- **Azure Event Grid:** An event-routing service. It uses a pub/sub model to react to status changes in Azure resources (e.g., a file added to Blob Storage triggers a Function). It focuses on *events* (notifications of a state change) rather than *messages* (commands with data).
- **Azure Event Hubs:** A big data streaming platform and event ingestion service. Designed to receive and process millions of events per second (e.g., telemetry data, logs, IoT device streams).

## Security & Identity

### 6. What is the difference between a Managed Identity and a Service Principal?
- **Service Principal:** An identity created for use with applications, hosted services, and automated tools to access Azure resources. You must manually manage its lifecycle, including rotating its secrets/certificates.
- **Managed Identity:** A feature of Microsoft Entra ID (formerly Azure AD) that provides Azure services with an automatically managed identity. You don't need to manage credentials, as Azure handles the rotation automatically. It's the recommended way for Azure services (like App Service or VMs) to access other Azure resources (like Key Vault).

### 7. How would you secure a public-facing API in Azure?
- **Edge:** Use Azure Front Door or Azure Application Gateway with a Web Application Firewall (WAF) to block malicious traffic (SQLi, XSS).
- **API Management:** Place Azure API Management (APIM) in front of the API to handle rate limiting, authentication (OAuth 2.0 / JWT validation), caching, and IP filtering.
- **Backend Security:** Place the backend services (e.g., App Service, AKS) in an Azure Virtual Network (VNet). Use Private Endpoints to ensure the backend is only accessible from APIM and not from the public internet.
- **Secrets:** Store connection strings and API keys in Azure Key Vault, accessed via Managed Identities.

## Infrastructure & High Availability

### 8. What is the difference between Availability Zones and Region Pairs in Azure?
- **Availability Zones:** Unique physical locations within an Azure region. Each zone is made up of one or more datacenters with independent power, cooling, and networking. Used to protect against datacenter-level failures.
- **Region Pairs:** Every Azure region is paired with another region within the same geography (e.g., East US and West US). Azure serializes platform updates across region pairs, ensuring both are not updated simultaneously. Used for disaster recovery and protecting against massive, region-wide outages.

### 9. Compare ARM Templates, Bicep, and Terraform for Azure IaC.
- **ARM Templates:** The native JSON-based IaC for Azure. Very verbose, steep learning curve, but supports 100% of Azure features on day one.
- **Bicep:** A Domain Specific Language (DSL) created by Microsoft as an abstraction over ARM templates. It has a much cleaner, more readable syntax, automatic dependency management, and compiles down to ARM JSON.
- **Terraform:** Cloud-agnostic IaC using HCL. Manages state independently. Highly preferred if the organization uses multiple cloud providers or relies heavily on a diverse ecosystem of providers outside of Azure.
