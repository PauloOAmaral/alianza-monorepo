# Notifications Package - React Email Templates

## Overview
The notifications package provides email and notification templates built with React Email. It centralizes all notification logic for the Alianza platform, ensuring consistent branding and messaging across different applications and contexts.

## Technology Stack
- **Framework**: React Email with React 19.1.0
- **Components**: `@react-email/components` for email-specific elements
- **Styling**: Tailwind CSS for email styling
- **Development**: `@react-email/preview-server` for template development
- **Integration**: `@alianza/services` for email delivery

## Architecture

### Project Structure
```
src/
├── admin/
│   └── templates/
│       ├── index.ts                    # Template exports
│       ├── email-verification.tsx     # Account verification
│       ├── password-reset.tsx         # Password reset
│       ├── signup-confirmation.tsx    # Registration confirmation
└── [other-projects]/                  # Future project templates
```

### Template Organization
Templates are organized by project (e.g., `admin`) to maintain separation between different applications while allowing shared templates in common directories when needed.

## Template Implementation Patterns

### Basic Template Structure
```typescript
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components"

interface TemplateProps {
    firstName: string
    lastName: string
    // Additional template-specific props
}

export const TemplateHtml = ({ firstName, lastName }: TemplateProps) => {
    const baseUrl = process.env.APP_PUBLIC_URL ?? "http://localhost:3000"
    const imagesBaseUrl = process.env.CDN_BASE_URL ?? "https://dev-images.example.com"
    const previewText = `Email subject or preview text`

    return (
        <Html>
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Head />
                <Body className="bg-white my-auto mx-auto font-sans px-[8px]">
                    <Container className="border border-solid border-[#7cc296] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        {/* Email content */}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

// Text version for fallback
const TemplateText = ({ firstName, lastName }: TemplateProps) => {
    return `Plain text version of the email...`
}

// Preview props for development
TemplateHtml.PreviewProps = {
    firstName: "John",
    lastName: "Doe",
} as TemplateProps

TemplateText.TextProps = {
    firstName: "John", 
    lastName: "Doe",
} as TemplateProps

export default TemplateHtml
export { TemplateText }
```

### Email Verification Template
```typescript
interface EmailVerificationProps {
    firstName: string
    lastName: string
    token: string
}

export const EmailVerificationHtml = ({ firstName, lastName, token }: EmailVerificationProps) => {
    const baseUrl = process.env.APP_PUBLIC_URL ?? "http://localhost:3000"
    const imagesBaseUrl = process.env.CDN_BASE_URL ?? "https://dev-images.example.com"

    return (
        <Html>
            <Preview>Verificação de email para {[firstName, lastName].join(" ")}</Preview>
            <Tailwind>
                <Head />
                <Body className="bg-white my-auto mx-auto font-sans px-[8px]">
                    <Container className="border border-solid border-[#7cc296] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section>
                            <Img
                                aria-hidden
                                className="my-0 mx-auto"
                                height="auto"
                                src={`${imagesBaseUrl}/width=80,height=auto,quality=80/emails/logo.png`}
                                width="80"
                            />
                        </Section>
                        
                        <Section>
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Alianza
                            </Heading>
                            
                            <Text className="text-black text-[14px] leading-[24px]">
                                {firstName || lastName
                                    ? `Olá ${[firstName, lastName].join(" ")},`
                                    : "Olá,"}
                            </Text>
                            
                            <Text className="text-black text-[14px] leading-[24px]">
                                Para que possamos concluir seu cadastro, por favor, clique no botão
                                abaixo para confirmar seu email:
                            </Text>
                            
                            <Section className="text-center">
                                <Button
                                    className="bg-[#355f46] text-white border-none rounded-md px-4 py-2 mx-auto"
                                    href={`${baseUrl}/verify?token=${token}&type=email`}
                                >
                                    Confirmar email
                                </Button>
                            </Section>
                        </Section>

                        <Hr className="!border-t !border-t-solid !border-t-[#7cc296] my-[26px] mx-0 w-full" />
                        
                        <Section>
                            <Text className="text-[12px] leading-[24px] text-center">
                                <Link
                                    className="text-[#666666] visited:text-[#666666]"
                                    href={baseUrl}
                                >
                                    {baseUrl}
                                </Link>
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
```

## Component Patterns

### Layout Components
```typescript
// Consistent container structure
<Container className="border border-solid border-[#7cc296] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
    {/* Email content */}
</Container>

// Header with logo
<Section>
    <Img
        aria-hidden
        className="my-0 mx-auto"
        height="auto"
        src={`${imagesBaseUrl}/width=80,height=auto,quality=80/emails/logo.png`}
        width="80"
    />
</Section>

// Heading section
<Section>
    <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
        Email Title
    </Heading>
</Section>
```

### Button Components
```typescript
// Primary action button
<Button
    className="bg-[#355f46] text-white border-none rounded-md px-6 py-3 text-[16px] font-semibold"
    href={actionUrl}
>
    Action Text
</Button>

// Secondary button
<Button
    className="border border-solid border-[#355f46] text-[#355f46] bg-white rounded-md px-6 py-3 text-[14px]"
    href={secondaryUrl}
>
    Secondary Action
</Button>
```

### Text Components
```typescript
// Body text
<Text className="text-black text-[14px] leading-[24px]">
    Regular email content
</Text>

// Small text / disclaimers
<Text className="text-[12px] leading-[20px] text-center text-[#666666]">
    Small disclaimer or footer text
</Text>

// Greeting with conditional name
<Text className="text-black text-[14px] leading-[24px]">
    {firstName || lastName
        ? `Olá ${[firstName, lastName].join(" ")},`
        : "Olá,"}
</Text>
```

### Divider and Spacing
```typescript
// Horizontal rule
<Hr className="!border-t !border-t-solid !border-t-[#7cc296] my-[26px] mx-0 w-full" />

// Spacing sections
<Section className="my-[32px]">
    {/* Content with margin */}
</Section>
```

## Development Workflow

### Local Development
```bash
# Start email preview server for Admin templates
bun run dev:admin

# Preview at http://localhost:3000
# All templates will be listed with live preview
```

### Template Preview
Templates include preview props for development:

```typescript
// Define preview props for development
TemplateHtml.PreviewProps = {
    firstName: "Maria",
    lastName: "Silva",
    token: "example-token-123",
    companyName: "Example Company",
} as TemplateProps

// Text version props
TemplateText.TextProps = {
    firstName: "Maria",
    lastName: "Silva", 
    token: "example-token-123",
} as TemplateProps
```

### Template Testing
```typescript
// Test template rendering
import { render } from "@react-email/render"
import { EmailVerificationHtml } from "./email-verification"

const html = render(EmailVerificationHtml({
    firstName: "Test",
    lastName: "User",
    token: "test-token"
}))

const text = render(EmailVerificationText({
    firstName: "Test", 
    lastName: "User",
    token: "test-token"
}), { plainText: true })
```

## Styling Guidelines

### Brand Colors
```css
/* Primary green */
bg-[#355f46]    /* Dark green for buttons */
border-[#7cc296] /* Light green for borders */

/* Text colors */
text-black      /* Primary text */
text-[#666666]  /* Secondary/muted text */
text-white      /* Button text */
```

### Typography
```css
/* Headings */
text-[24px] font-normal  /* Main heading */
text-[18px] font-medium  /* Sub heading */

/* Body text */
text-[14px] leading-[24px]  /* Regular text */
text-[12px] leading-[20px]  /* Small text */

/* Buttons */
text-[16px] font-semibold   /* Primary button */
text-[14px]                 /* Secondary button */
```

### Layout
```css
/* Container */
max-w-[465px]              /* Email width */
border border-solid        /* Consistent borders */
rounded                    /* Rounded corners */
p-[20px]                  /* Padding */

/* Spacing */
my-[40px]    /* Large vertical margin */
my-[32px]    /* Medium vertical margin */
my-[26px]    /* Standard margin */
px-[8px]     /* Side padding */
```

## Environment Configuration

### Required Environment Variables
```bash
# Application base URL for links
APP_PUBLIC_URL=https://app.example.com

# CDN base URL for images
CDN_BASE_URL=https://images.example.com/cdn-cgi/image

# Email service configuration (in services package)
RESEND_API_KEY=re_xxxxx
```

### Image Optimization
Images are served through CDN with optimization parameters:

```typescript
const imagesBaseUrl = process.env.CDN_BASE_URL ?? "https://dev-images.example.com"

// Optimized image URL
src={`${imagesBaseUrl}/width=80,height=auto,quality=80/emails/logo.png`}
```

## Integration with Services

### Email Sending
Templates are consumed by the services package for email delivery:

```typescript
import { render } from "@react-email/render"
import { EmailVerificationHtml, EmailVerificationText } from "@alianza/notifications/admin/templates"
import { sendEmail } from "@alianza/services/email/resend"

// Render templates
const html = render(EmailVerificationHtml(props))
const text = render(EmailVerificationText(props), { plainText: true })

// Send email
await sendEmail({
    to: email,
    subject: "Verificação de Email",
    html,
    text,
})
```

### Template Props Validation
Use TypeScript interfaces for type safety:

```typescript
interface EmailProps {
    firstName: string
    lastName: string
    email: string
    // Required props
}

interface OptionalEmailProps {
    companyName?: string
    role?: string
    // Optional props with defaults
}

type CombinedProps = EmailProps & OptionalEmailProps
```

## Template Categories

### Authentication Templates
- **Email Verification**: Confirm email address
- **Password Reset**: Reset forgotten password
- **Signup Confirmation**: Welcome new users

## Best Practices

### 1. Template Design
- **Mobile-First**: Ensure templates work on mobile devices
- **Consistent Branding**: Use established color scheme and typography
- **Clear CTAs**: Make action buttons prominent and clear
- **Accessibility**: Include proper alt text and semantic structure

### 2. Content Guidelines
- **Personalization**: Use user names when available
- **Clear Purpose**: State the email purpose clearly
- **Action-Oriented**: Guide users to specific actions
- **Fallback Content**: Provide meaningful defaults for missing data

### 3. Technical Implementation
- **Dual Formats**: Always provide HTML and text versions
- **Environment Awareness**: Use environment variables for URLs
- **Preview Props**: Include realistic preview data
- **Type Safety**: Use TypeScript interfaces for props

### 4. Performance
- **Image Optimization**: Use CDN with optimization parameters
- **Minimal CSS**: Keep styles minimal for email compatibility
- **Fast Loading**: Optimize for quick email rendering
- **Fallback Fonts**: Use web-safe font stacks

## Common Template Snippets

### Conditional Greeting
```typescript
<Text className="text-black text-[14px] leading-[24px]">
    {firstName || lastName
        ? `Olá ${[firstName, lastName].filter(Boolean).join(" ")},`
        : "Olá,"}
</Text>
```

### Action Button with URL
```typescript
<Section className="text-center my-[32px]">
    <Button
        className="bg-[#355f46] text-white border-none rounded-md px-6 py-3 text-[16px] font-semibold"
        href={`${baseUrl}/action?token=${token}`}
    >
        Take Action
    </Button>
</Section>
```

### Footer with Links
```typescript
<Section>
    <Text className="text-[12px] leading-[24px] text-center">
        <Link
            className="text-[#666666] visited:text-[#666666]"
            href={baseUrl}
        >
            {baseUrl}
        </Link>
    </Text>
</Section>
```

### Expiration Notice
```typescript
<Text className="text-black text-[12px] leading-[20px] text-center text-[#666666]">
    Este convite expira em 7 dias. Se você não deseja participar, 
    pode ignorar este email.
</Text>
```

## Development Scripts

```bash
# Development
bun run dev:admin          # Start preview server for admin templates (http://localhost:3000)

# Code Quality
bun run lint                 # Lint with Biome
bun run format               # Format with Biome
bun run typecheck            # TypeScript validation

# Cleanup
bun run clean                # Remove generated files and dependencies
```

## Dependencies

### Core Dependencies
- `@react-email/components` - Email-specific React components
- `@alianza/services` - Email delivery integration

### Development Dependencies
- `@react-email/preview-server` - Local development preview
- `react` & `react-dom` - React runtime (peer dependencies)
- `react-email` - Build tooling

## Export Structure

### Package Exports
```json
{
  "exports": {
    "./admin/templates": "./src/admin/templates/index.ts"
  }
}
```

### Template Exports
```typescript
// src/admin/templates/index.ts
export * from "./email-verification"
export * from "./password-reset"
export * from "./signup-confirmation"
// ... all templates
```

This notifications package provides a robust foundation for all email communications in the Alianza platform, with consistent branding, responsive design, and easy integration with the broader application ecosystem.
