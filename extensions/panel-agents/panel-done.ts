/**
 * Tiny extension loaded into panel sub-agents.
 * Provides a `panel_done` tool the agent calls when its task is complete.
 * Triggers a graceful pi shutdown so the panel closes automatically.
 */
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "panel_done",
    label: "Panel Done",
    description:
      "Call this tool when you have completed your task. " +
      "It will close this session and return your results to the main session. " +
      "Your LAST assistant message before calling this becomes the summary returned to the caller.",
    parameters: Type.Object({}),
    async execute(_toolCallId, _params, _signal, _onUpdate, ctx) {
      ctx.shutdown();
      return {
        content: [{ type: "text", text: "Shutting down panel session." }],
        details: {},
      };
    },
  });
}
