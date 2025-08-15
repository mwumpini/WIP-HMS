"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Chart container component
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: Record<string, any>
  }
>(({ className, config, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

// Chart tooltip component
const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }
>(
  (
    { active, payload, label, hideLabel = false, hideIndicator = false, indicator = "dot", className, ...props }: any,
    ref,
  ) => {
    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
        {...props}
      >
        {!hideLabel && label && <p className="font-medium text-foreground">{String(label)}</p>}
        <div className="grid gap-1.5">
          {payload.map((item: any, index: number) => {
            const displayValue =
              typeof item.value === "number" ? `GHS ${item.value.toFixed(2)}` : String(item.value || "")

            return (
              <div
                key={index}
                className="flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
              >
                {!hideIndicator && (
                  <div
                    className="shrink-0 rounded-[2px] border w-2.5 h-2.5"
                    style={{
                      backgroundColor: item.color || "#8884d8",
                      borderColor: item.color || "#8884d8",
                    }}
                  />
                )}
                <div className="flex flex-1 justify-between leading-none">
                  <div className="grid gap-1.5">
                    <span className="text-muted-foreground">{String(item.dataKey || item.name || "")}</span>
                  </div>
                  <span className="font-mono font-medium tabular-nums text-foreground">{displayValue}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
