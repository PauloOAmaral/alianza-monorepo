# Services Package - External Integrations

## Overview
The services package provides a centralized layer for integrating with external services and APIs. It abstracts third-party service complexity and provides consistent interfaces for email delivery, file storage, streaming, captcha validation, and other cloud services.

## Technology Stack
- **Email**: Resend API for transactional emails
- **Storage**: Cloudflare R2 (S3-compatible) for file storage
- **KV Storage**: Cloudflare KV for session and cache storage
- **Streaming**: Cloudflare Stream for video processing and delivery
- **Captcha**: Cloudflare Turnstile for bot protection
- **Places**: Google Places API for location services
- **Runtime**: Cloudflare Workers compatible

## Architecture

### Service Categories
```
src/
├── email/
│   └── resend.ts              # Email delivery via Resend
├── storage/
│   ├── cloudflare-r2.ts       # R2 file storage implementation
│   └── storage.types.ts       # Storage interface definitions
├── kv/
│   ├── cloudflare-kv.ts       # KV storage implementation
│   └── kv.types.ts            # KV interface definitions
├── streaming/
│   ├── cloudflare.ts          # Stream video processing
│   └── cloudflare.types.ts    # Streaming type definitions
├── captcha/
│   └── turnstile.ts           # Turnstile captcha validation
└── google/
    └── places.ts              # Google Places API integration
```

### Package Exports
```json
{
  "exports": {
    "./email/resend": "./src/email/resend.ts",
    "./storage": "./src/storage/index.ts", 
    "./kv": "./src/kv/index.ts",
    "./streaming": "./src/streaming/index.ts",
    "./captcha/turnstile": "./src/captcha/turnstile.ts",
    "./google/places": "./src/google/places.ts"
  }
}
```

## Email Service (Resend)

### Basic Usage
```typescript
import { resendClient } from "@alianza/services/email/resend"

const email = resendClient()

await email.sendEmail({
    from: "noreply@example.com",
    to: ["user@example.com"],
    subject: "Welcome to our platform",
    html: htmlContent,
    text: textContent,
})
```

### Integration with Notifications
```typescript
import { render } from "@react-email/render"
import { EmailVerificationHtml, EmailVerificationText } from "@alianza/notifications/admin/templates"
import { resendClient } from "@alianza/services/email/resend"

const email = resendClient()

// Render templates
const html = render(EmailVerificationHtml(props))
const text = render(EmailVerificationText(props), { plainText: true })

// Send email
await email.sendEmail({
    from: "noreply@example.com",
    to: [userEmail],
    subject: "Email Verification",
    html,
    text,
})
```

### Environment Configuration
```bash
# Required environment variable
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

## File Storage (Cloudflare R2)

### R2FileStorage Implementation
Implements the `@mjackson/file-storage` interface for Cloudflare R2:

```typescript
import { R2FileStorage } from "@alianza/services/storage"

// Storage instance (usually injected via application layer)
const storage = new R2FileStorage(r2Bucket)

// Store file
const file = new File(["content"], "filename.txt", { type: "text/plain" })
await storage.put("path/to/file.txt", file)

// Retrieve file
const retrievedFile = await storage.get("path/to/file.txt")

// Check if file exists
const exists = await storage.has("path/to/file.txt")

// Remove file
await storage.remove("path/to/file.txt")

// List files
const result = await storage.list({
    prefix: "uploads/",
    limit: 100,
    includeMetadata: true,
})
```

### Multipart Upload Strategy
The R2FileStorage implementation uses multipart uploads for reliability:

```typescript
// Fixed 5MB buffer to limit memory usage
const PART_SIZE = 5 * 1024 * 1024

// Handles large files efficiently
const multipartUpload = await r2.createMultipartUpload(key, {
    httpMetadata: { contentType: file.type },
    customMetadata: { name: key, type: file.type },
})

// Stream-based upload with memory management
const stream = file.stream()
const reader = stream.getReader()

// Upload parts sequentially
while (!done) {
    const part = await multipartUpload.uploadPart(partNumber, buffer)
    parts.push(part)
}

await multipartUpload.complete(parts)
```

### File Metadata
Custom metadata is stored with each file:

```typescript
interface CustomMetadata {
    name: string    // Original filename
    type: string    // MIME type
}

// Metadata is preserved and returned with file objects
const file = await storage.get("path/to/file.txt")
console.log(file.name, file.type, file.lastModified)
```

### Storage Types
```typescript
export interface FileStorage {
    has(key: string): Promise<boolean>
    set(key: string, file: File): Promise<void>
    put(key: string, file: File): Promise<File>
    get(key: string): Promise<File | null>
    remove(key: string): Promise<void>
    list<T extends ListOptions>(options?: T): Promise<ListResult<T>>
}
```

## KV Storage (Cloudflare KV)

### Redis-like Interface
Implements a Redis-compatible interface using Cloudflare KV:

```typescript
import { KVStorage } from "@alianza/services/kv"

const kvStorage = new KVStorage(kvNamespace)

// Basic operations
await kvStorage.set("key", "value")
const value = await kvStorage.get("key") // Returns string | null
const exists = await kvStorage.has("key") // Returns 1 | 0
await kvStorage.delete("key")

// With expiration
await kvStorage.set("session:123", sessionData, { 
    expirationTtl: 3600 // 1 hour
})
```

### Session Storage Pattern
```typescript
// Store session data
await kv.set(`session:${sessionId}`, JSON.stringify(sessionData), {
    expirationTtl: 24 * 60 * 60, // 24 hours
})

// Retrieve session
const sessionJson = await kv.get(`session:${sessionId}`)
const session = sessionJson ? JSON.parse(sessionJson) : null

// Clean up session
await kv.delete(`session:${sessionId}`)
```

### Cache Pattern
```typescript
// Cache expensive computations
const cacheKey = `cache:user:${userId}:permissions`
const cached = await kv.get(cacheKey)

if (cached) {
    return JSON.parse(cached)
}

const permissions = await computeExpensivePermissions(userId)
await kv.set(cacheKey, JSON.stringify(permissions), {
    expirationTtl: 300, // 5 minutes
})

return permissions
```

## Video Streaming (Cloudflare Stream)

### Video Import from R2
Import videos from private R2 buckets to Cloudflare Stream:

```typescript
import { importVideoFromR2 } from "@alianza/services/streaming"

const result = await importVideoFromR2(
    "private-videos-bucket",
    "uploads/lesson-video.mp4",
    {
        name: "Lesson 1: Introduction",
        allowedOrigins: ["https://app.example.com"],
        thumbnailTimestampPct: 0.5, // Thumbnail at 50%
    }
)

if (result.success) {
    console.log("Video ID:", result.data.videoId)
    console.log("Status:", result.data.status)
    console.log("Thumbnail:", result.data.thumbnail)
}
```

### Signed URL Generation
Generate secure, time-limited URLs for video access:

```typescript
import { createStreamToken } from "@alianza/services/streaming"

const tokenResult = await createStreamToken(videoId, {
    expiresInHours: 4,
    userId: "user-123",
    allowedIPs: ["192.168.1.100"],
    customClaims: { courseId: "course-456" },
})

if (tokenResult.success) {
    const videoUrl = `https://customer-${customerId}.cloudflarestream.com/${tokenResult.data}/manifest/video.m3u8`
}
```

### Video Status Monitoring
Check video processing status:

```typescript
import { getVideoStatus } from "@alianza/services/streaming"

const statusResult = await getVideoStatus(videoId)

if (statusResult.success) {
    switch (statusResult.data.status) {
        case "ready":
            // Video is ready for playback
            break
        case "queued":
        case "inprogress":
            // Still processing
            break
        case "error":
            // Processing failed
            break
    }
}
```

### Video Management
```typescript
import { 
    findVideoByFilename, 
    deleteVideo 
} from "@alianza/services/streaming"

// Find video by filename
const videoResult = await findVideoByFilename("lesson-video.mp4")

// Delete video
await deleteVideo(videoId)
```

### Environment Configuration
```bash
# Cloudflare Stream configuration
CLOUDFLARE_ACCOUNT_ID=xxxxx
CLOUDFLARE_ACCOUNT_TOKEN=xxxxx
CLOUDFLARE_STREAM_CUSTOMER_ID=xxxxx
CLOUDFLARE_STREAM_ID=xxxxx
CLOUDFLARE_STREAM_PRIVATE_KEY=base64-encoded-jwk

# R2 configuration for signed URLs
CLOUDFLARE_R2_REGION=auto
CLOUDFLARE_R2_ACCESS_KEY_ID=xxxxx
CLOUDFLARE_R2_SECRET_ACCESS_KEY=xxxxx
```

## Captcha Validation (Turnstile)

### Simple Validation
```typescript
import { validateTurnstile } from "@alianza/services/captcha/turnstile"

const isValid = await validateTurnstile(turnstileResponse)

if (isValid.success) {
    // Proceed with form processing
} else {
    // Show captcha error
}
```

### Environment Configuration
```bash
# Turnstile configuration
CLOUDFLARE_TURNSTILE_SECRET_KEY=xxxxx
CLOUDFLARE_TURNSTILE_VERIFY_URL=https://challenges.cloudflare.com/turnstile/v0/siteverify
```

## Google Places API

### Place Autocomplete
```typescript
import { getPlaceAutocomplete } from "@alianza/services/google/places"

const suggestions = await getPlaceAutocomplete("São Paulo", {
    language: "pt-BR",
    region: "br",
})

if (suggestions.success) {
    suggestions.data.forEach(place => {
        console.log(place.description, place.place_id)
    })
}
```

### Place Details
```typescript
import { getPlaceDetails } from "@alianza/services/google/places"

const details = await getPlaceDetails(placeId, {
    fields: ["name", "formatted_address", "geometry"],
    language: "pt-BR",
})

if (details.success) {
    console.log(details.data.name)
    console.log(details.data.formatted_address)
    console.log(details.data.geometry.location)
}
```

### Environment Configuration
```bash
# Google Places API
GOOGLE_PLACES_API_KEY=xxxxx
```

## Error Handling Patterns

### Consistent Response Format
All services use a consistent response format:

```typescript
interface ServiceResponse<T> {
    success: boolean
    data?: T
    error?: string
}

// Success response
{ success: true, data: result }

// Error response  
{ success: false, error: "Error message" }
```

### Error Handling Implementation
```typescript
export async function serviceFunction(): Promise<ServiceResponse<ResultType>> {
    try {
        const result = await performOperation()
        
        return {
            success: true,
            data: result,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        }
    }
}
```

### Usage Pattern
```typescript
const result = await serviceFunction()

if (result.success) {
    // Use result.data
    console.log(result.data)
} else {
    // Handle error
    console.error(result.error)
}
```

## Integration Patterns

### Application Layer Integration
Services are typically used within the application layer:

```typescript
// In application command/query
import { resendClient } from "@alianza/services/email/resend"
import { createAction } from "../action-builder"

export const sendWelcomeEmailCommand = createAction()
    .withData<{ email: string; name: string }>()
     // Provides storage context
    .build(async ({ data, storage }) => {
        const email = resendClient()
        
        await email.sendEmail({
            to: [data.email],
            subject: "Welcome!",
            html: `<h1>Hello ${data.name}!</h1>`,
        })
    })
```

### Storage Context in Actions
```typescript
export const uploadFileCommand = createAction()
    .withData<{ file: File; path: string }>()
    
    .build(async ({ data, storage }) => {
        // storage.images, storage.videos, storage.documents available
        const uploadedFile = await storage.images.put(data.path, data.file)
        
        // Save file reference to database
        // ...
        
        return uploadedFile
    })
```

## Cloudflare Workers Compatibility

### Supported APIs
All services are designed for Cloudflare Workers runtime:
- **Fetch API**: Used for HTTP requests
- **Crypto API**: Used for JWT signing and encryption
- **Streams**: Used for file processing
- **WebAssembly**: Compatible if needed

### Restricted APIs
These Node.js APIs are **NOT** available:
- File system operations
- Buffer (use Uint8Array instead)
- Process.env (use environment variables)
- Child processes

### Best Practices
```typescript
// ✅ Use Fetch API
const response = await fetch(url, options)

// ✅ Use Crypto API
const signature = await crypto.subtle.sign(algorithm, key, data)

// ✅ Use environment variables
const apiKey = process.env.API_KEY

// ❌ Don't use Node.js APIs
import fs from "fs" // Won't work
import { Buffer } from "buffer" // Use Uint8Array instead
```

## Dependencies

### Core Dependencies
- `@mjackson/file-storage` - File storage interface
- `@mjackson/lazy-file` - Lazy file implementation
- `aws4fetch` - AWS signature v4 for R2
- `jose` - JWT operations
- `resend` - Email delivery

### Peer Dependencies
None - services package is self-contained for maximum compatibility.

## Development Scripts

```bash
# Code quality
bun run lint              # Lint with Biome
bun run format            # Format with Biome
bun run typecheck         # TypeScript validation

# Cleanup
bun run clean             # Remove generated files
```

## Environment Variables

### Required Variables
```bash
# Email service
RESEND_API_KEY=re_xxxxx

# Cloudflare services
CLOUDFLARE_ACCOUNT_ID=xxxxx
CLOUDFLARE_ACCOUNT_TOKEN=xxxxx

# Stream service
CLOUDFLARE_STREAM_CUSTOMER_ID=xxxxx
CLOUDFLARE_STREAM_ID=xxxxx
CLOUDFLARE_STREAM_PRIVATE_KEY=xxxxx

# R2 storage
CLOUDFLARE_R2_REGION=auto
CLOUDFLARE_R2_ACCESS_KEY_ID=xxxxx
CLOUDFLARE_R2_SECRET_ACCESS_KEY=xxxxx

# Turnstile captcha
CLOUDFLARE_TURNSTILE_SECRET_KEY=xxxxx
CLOUDFLARE_TURNSTILE_VERIFY_URL=https://challenges.cloudflare.com/turnstile/v0/siteverify

# Google Places
GOOGLE_PLACES_API_KEY=xxxxx
```

### Optional Variables
```bash
# Default URLs for development
APP_PUBLIC_URL=http://localhost:3000
CDN_BASE_URL=https://dev-images.example.com
```

## Performance Considerations

### File Storage
- Uses multipart uploads for large files
- Fixed memory buffers to prevent OOM
- Streams data to minimize memory usage
- Supports concurrent part uploads

### KV Storage
- Redis-compatible interface
- TTL support for automatic cleanup
- Optimized for session storage
- Cache-friendly key patterns

### Video Streaming
- Automatic thumbnail generation
- Configurable quality settings
- Signed URL security
- Integration with R2 for source files

## Security Features

### Video Streaming
- JWT-based signed URLs
- IP address restrictions
- Time-based expiration
- Custom claims support

### File Storage
- Private bucket access
- Signed URL generation
- Metadata preservation
- Access control integration

### Captcha Validation
- Server-side verification
- Cloudflare Turnstile integration
- Bot protection

This services package provides a robust foundation for external service integrations in the Alianza platform, with a focus on Cloudflare Workers compatibility and consistent error handling patterns.
