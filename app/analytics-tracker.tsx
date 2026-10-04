"use client";

import { useEffect } from "react";
import { usePlausible } from "next-plausible";

type AnalyticsEvents = {
  link_click: {
    destination: string;
    target: string;
    external: string;
    placement: string;
  };
  form_submit: { form: string };
};

function destinationFor(href: string): { destination: string; external: string } {
  if (href.startsWith("mailto:")) {
    return { destination: "email", external: "true" };
  }
  if (href.startsWith("tel:")) {
    return { destination: "phone", external: "true" };
  }

  const url = new URL(href, window.location.href);
  return {
    destination: `${url.host}${url.pathname}`,
    external: url.host !== window.location.host ? "true" : "false",
  };
}

export function AnalyticsTracker() {
  const plausible = usePlausible<AnalyticsEvents>();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const { destination, external } = destinationFor(link.href);
      const placement =
        link.dataset.analyticsPlacement ??
        link.closest<HTMLElement>("[data-analytics-placement]")?.dataset
          .analyticsPlacement ??
        "unknown";
      const label = (link.getAttribute("aria-label") || link.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);

      plausible("link_click", {
        props: {
          destination,
          target: label || "unlabelled",
          external,
          placement,
        },
      });
    }

    function handleSubmit(event: SubmitEvent) {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      plausible("form_submit", {
        props: { form: form.dataset.analyticsForm || "unknown" },
      });
    }

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, [plausible]);

  return null;
}
