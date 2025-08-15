import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  AlertTriangle,
  Shield,
  Gauge,
  Database,
  Settings,
  Smartphone,
  Accessibility,
  Cpu,
  FileDown,
  Wand2,
} from "lucide-react"

export default function AuditPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Product Audit & Recommendations</h1>
          <p className="text-gray-600 max-w-3xl">
            A holistic review of your current app across architecture, security, data, UX, performance, accessibility,
            and code quality, with a prioritized roadmap.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      {/* Top Risks */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Top Risks
            </CardTitle>
            <CardDescription>High-priority concerns to address immediately</CardDescription>
          </div>
          <Badge variant="destructive">High</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
            <li>
              Authentication and authorization are simulated on the client using localStorage; no real auth, no session
              management, and no server-side protection.
            </li>
            <li>
              All data (sales, expenses, payroll) is stored in localStorage without encryption or backups; data loss and
              tampering risks are high.
            </li>
            <li>
              The marketing landing page code exists but is never seen due to an unconditional redirect to /login in
              app/page.tsx, wasting valuable SEO and first-impression opportunities.
            </li>
            <li>
              Inconsistent CSV export implementations and lack of unified utilities risk formatting bugs and data
              quality issues.
            </li>
            <li>
              Duplicate toast utilities (components/ui/use-toast.tsx and hooks/use-toast.ts) can cause drift and
              unpredictable behavior.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Architecture & Data */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-600" />
              Architecture & Data
            </CardTitle>
            <CardDescription>Data integrity, persistence, and maintainability</CardDescription>
          </div>
          <Badge>Medium</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Observations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>
                All core entities (sales, expenses, payrollStaff, users) persist to localStorage with ad-hoc keys.
              </li>
              <li>No centralized data access layer or schemas; types exist inline, but validation is minimal.</li>
              <li>Server Actions / Route Handlers are not used for data or business logic.</li>
              <li>
                No environment variables or secure storage for secrets (appropriate for demo, not for production).
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>
                Adopt a managed backend: Supabase (Auth, Postgres, Storage) or Neon (Postgres) with Prisma or SQL
                client. Start with a minimal schema for sales, expenses, staff, and users.
              </li>
              <li>Introduce a thin data layer (repositories) with Zod validation per entity and shared DTOs.</li>
              <li>
                Move write operations into Server Actions / Route Handlers, keep pages as Server Components by default.
              </li>
              <li>Add daily/weekly backups and export endpoints for data portability.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />
              Security & Compliance
            </CardTitle>
            <CardDescription>Protect users, data, and access</CardDescription>
          </div>
          <Badge variant="destructive">High</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Observations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>LocalStorage “session” can be altered by users; authorization checks are client-only.</li>
              <li>
                Passwords are collected in some forms (login/signup/staff create) but not handled securely (demo-only).
              </li>
              <li>No audit trail for sensitive changes (active work item exists).</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>
                Implement real auth (Supabase Auth, or NextAuth with a provider). Enforce server-side session checks on
                protected routes.
              </li>
              <li>Hash passwords server-side (if self-managed). Never store credentials or tokens in localStorage.</li>
              <li>Introduce RBAC in DB (roles: admin, staff, viewer). Authorize every write on the server.</li>
              <li>Add an append-only audit log of CRUD operations on sensitive entities.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* UX & IA */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-600" />
              UX, Navigation & Information Architecture
            </CardTitle>
            <CardDescription>Clarity, discoverability, and consistency</CardDescription>
          </div>
          <Badge>Medium</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Observations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>The landing page is well-designed but never displayed due to redirect in app/page.tsx.</li>
              <li>Large monolithic forms (e.g., Staff Management) increase cognitive load and scroll fatigue.</li>
              <li>Some components (e.g., toasts) are duplicated across folders, risking inconsistent UX.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>
                Make the redirect conditional (only redirect if not logged in or after feature flag). Let the landing
                page serve marketing and onboarding.
              </li>
              <li>
                Convert large forms to a stepper (multi-step wizard) with autosave, progress, and section summaries.
              </li>
              <li>
                Create a component library for form rows, section headers, help text, and action bars to ensure visual
                consistency.
              </li>
              <li>Unify toast implementation in a single module; remove duplicates.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-blue-600" />
              Performance & Scalability
            </CardTitle>
            <CardDescription>Responsiveness with growing data</CardDescription>
          </div>
          <Badge>Medium</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Observations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Tables render entire datasets; no pagination, virtualization, or server-side filtering.</li>
              <li>Filtering/sorting done on the client on every render without memoization.</li>
              <li>Large single-file pages increase bundle size and reduce code reuse.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Add pagination and server-side query parameters for filtering/sorting on lists.</li>
              <li>Use useMemo for derived lists and consider virtualization for long tables.</li>
              <li>Split big pages into smaller components with lazy loading where appropriate.</li>
              <li>Compress and lazy-load images; ensure responsive sizes.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-purple-600" />
              Accessibility
            </CardTitle>
            <CardDescription>Inclusive and usable for everyone</CardDescription>
          </div>
          <Badge>Medium</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Observations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>
                Labels are mostly present; ARIA and focus management for dialogs and menus depend on shadcn/ui (good
                baseline).
              </li>
              <li>Icon-only buttons have mixed accessible names; some rely purely on icons.</li>
              <li>Color contrast should be re-verified in “blue” and “purple” variants.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Ensure all icon-only buttons have aria-label or sr-only text.</li>
              <li>Provide error/help text with aria-live regions where appropriate (form validation).</li>
              <li>Run automated checks (axe) and manual keyboard-only passes for critical flows.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Code Quality */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-gray-700" />
              Code Quality & Maintainability
            </CardTitle>
            <CardDescription>Structure, reuse, and standards</CardDescription>
          </div>
          <Badge>Low</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Observations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Duplicate toast utilities in two locations.</li>
              <li>CSV export logic duplicated across pages with minor differences.</li>
              <li>Utility functions (format currency, date helpers) repeated inline.</li>
              <li>Some effects set timeouts without cleanup; risk of memory leaks on quick navigation.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Create a shared utils module: currency, CSV, date, validation, and ID generation.</li>
              <li>Unify toast hook into a single implementation and single import path.</li>
              <li>Abstract table components (Toolbar, Filters, Export) to reduce duplication.</li>
              <li>Add ESLint + Prettier config, plus TypeScript strict mode to catch edge cases early.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Mobile & Responsiveness */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-teal-600" />
              Mobile & Responsiveness
            </CardTitle>
            <CardDescription>Great experience across devices</CardDescription>
          </div>
          <Badge>Medium</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Observations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Tables are horizontally scrollable (good), but form dialogs become very tall on small screens.</li>
              <li>Some buttons and paddings are tight on smaller widths.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Add a mobile-friendly stepper for complex dialogs (e.g., Staff form) with sticky footer actions.</li>
              <li>Increase touch targets and spacing on mobile (min 44px height).</li>
              <li>Use content-visibility/lazy sections to defer offscreen work where possible.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Data Export & Reporting */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileDown className="h-5 w-5 text-rose-600" />
              Data Export, Backups & Reporting
            </CardTitle>
            <CardDescription>Reliability and portability</CardDescription>
          </div>
          <Badge>Medium</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Observations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>CSV export exists but differs per page; escaping of fields and newlines is inconsistent.</li>
              <li>No background export jobs, no scheduled backups, no import validation pipeline.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>
                Create a single CSV/Excel export utility with consistent quoting and UTF-8 BOM for Excel compatibility.
              </li>
              <li>Add import pipelines with validation and preview before commit.</li>
              <li>Introduce scheduled backups (daily to object storage) and restore flows.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Intelligent Assistance */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-fuchsia-600" />
              Intelligent Assistance (Optional)
            </CardTitle>
            <CardDescription>Improve operator efficiency and support</CardDescription>
          </div>
          <Badge>Opportunity</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-800">
            Consider an AI-powered assistant for contextual help (e.g., “explain this report”, “summarize staff
            changes”), using the AI SDK’s generateText/streamText for consistent model access across providers [^1].
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
            <li>Inline suggestions in forms (tooltip or side panel) and explanation of tax computations.</li>
            <li>Quick query on sales/expense trends and anomaly detection highlights.</li>
            <li>Draft emails (e.g., supplier queries, staff notifications) based on selected records.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Prioritized Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Prioritized Roadmap</CardTitle>
          <CardDescription>Concrete steps by time horizon</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Immediate (0-3 days)</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Make landing page redirect conditional; show marketing site for visitors.</li>
              <li>Unify toast utility and remove duplicates.</li>
              <li>Extract CSV export helper and update all pages to use it.</li>
              <li>Add role guard UI (hide admin-only items) and basic client checks consistently.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Short Term (1-2 weeks)</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Integrate real auth (Supabase Auth) and migrate localStorage data to Postgres.</li>
              <li>Create repository layer with Zod validation; move writes to Server Actions.</li>
              <li>Add pagination + filters to Sales, Expenses, Staff lists.</li>
              <li>Refactor Staff form into a multi-step wizard with autosave and progress.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Mid Term (3-6 weeks)</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-800">
              <li>Implement RBAC with server-side enforcement and an audit trail.</li>
              <li>Add import/export pipelines with validation and backup/restore.</li>
              <li>Introduce scheduled backups to object storage and restore flows.</li>
              <li>Add optional AI assistant for contextual help and report insights [^1].</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* File-Level Findings */}
      <Card>
        <CardHeader>
          <CardTitle>File-Level Findings</CardTitle>
          <CardDescription>Concrete, actionable spots to update</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-gray-800 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>
              app/page.tsx: unconditional redirect('/login') hides the entire landing page. Make conditional based on
              session.
            </li>
            <li>
              Toast utilities duplicated at components/ui/use-toast.tsx and hooks/use-toast.ts. Consolidate into one.
            </li>
            <li>
              CSV exports implemented separately in /dashboard/expenses, /dashboard/sales, and staff management. Replace
              with shared CSV utility that properly quotes values and newlines.
            </li>
            <li>
              Long monolithic pages (e.g., staff-management) should be split into logical subcomponents and steps; add
              autosave to reduce loss risk.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
