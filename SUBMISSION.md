# Submission Requirements Checklist

## 1. Loom Video
- **Link**: See `VIDEO_URL.txt` in the root of this repository.
- **Content**: The video walks through the product features (creation, editing, renaming, importing, sharing), the technical architecture, and the AI workflow.

## 2. Vercel Deployment URL
- **Link**: See `README.md` for the live production URL.

## 3. GitHub Repository
- **Link**: The repository you are currently viewing.
- **Documentation**: Includes `README.md`, `ARCHITECTURE.md`, `AI_WORKFLOW.md`, and this `SUBMISSION.md`.

## 4. Test Suite
- **Location**: `src/lib/authz.test.ts`
- **Framework**: Vitest
- **Execution**: Run `npm test`
- **Description**: The test suite verifies the authorization logic, ensuring that document owners and editors have write access, while viewers and unrelated users are denied access.
