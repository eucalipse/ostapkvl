/** Proposed sequence and copy; not publication authorization. */
export const articleLaunches: Record<string, { order: number; caption: string }> = {
  "the-question-an-agent-should-ask": {
    order: 1,
    caption: `“Please review” gives someone a task to decipher.\n\nFor a business agent, I want the escalation to say what needs deciding, show the evidence, and explain what happens after the answer.\n\nAn option to say “we don’t have enough information” matters as much as an approve button.\n\nI wrote about the questions I want agents to bring to a decision inbox, using a hypothetical invoice example.\n\nhttps://ostapkvl.com/writing/the-question-an-agent-should-ask\n\nWhat information do you usually have to chase before you can answer an agent’s question?`,
  },
  "two-agents-one-business-record": {
    order: 2,
    caption: `Two agents finish successfully. The business record is still inconsistent.\n\nOne matches an invoice. Another updates the supplier’s terms. The match used the old terms, but both runs show green.\n\nThis is a design problem I’m exploring for Heedroom: how to make the relationship between agents’ work visible, including the checks that became outdated.\n\nThe article walks through a hypothetical case, conditional writes, and the business conflicts a database alone cannot resolve.\n\nhttps://ostapkvl.com/writing/two-agents-one-business-record\n\nWhere do you reconcile changes when multiple agents work on the same record?`,
  },
  "what-to-keep-before-an-agent-forgets": {
    order: 3,
    caption: `“The implementation is complete. One test remains.”\n\nThat is a plausible session summary. It leaves the next agent with some important questions: which revision, which test, and what did the last failure say?\n\nI wrote about checkpoints that preserve the goal, exact evidence, rejected assumptions, and the next bounded action.\n\nThe test I care about is whether the next agent can resume and verify its work without rebuilding the missing history.\n\nhttps://ostapkvl.com/writing/what-to-keep-before-an-agent-forgets\n\nWhat do you keep outside the conversation before handing a task to another agent?`,
  },
  "the-agent-is-waiting-for-you": {
    order: 4,
    caption: `Picture a back office run by six AI agents.\n\nOne checks invoices against orders. One sorts the inbox. One drafts a refund reply. And one has stopped, because it found two different bank accounts for the same supplier and does not know which one to use.\n\nFrom a distance all six look busy. Only one needs you, and it is the quiet one.\n\nCoding tools already solved this for engineers: one view that shows which agent session actually needs a human. Business teams running agents need the same idea, but tuned for money and data instead of code diffs.\n\nI wrote about what that console should look like, and why the “amber badge” pattern is not enough when one item needs a choice, one needs a read, and one needs an honest warning that something stopped responding.\n\nhttps://ostapkvl.com/writing/the-agent-is-waiting-for-you\n\nIf you run more than one agent today, how do you find the one that is actually stuck?`,
  },
};
