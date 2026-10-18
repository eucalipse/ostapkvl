export type ProjectCopy = { title?: string; description: string; useCasesLabel?: string; useCases?: string[] };
export type ArchiveCopy = { role: string; description: string; domain: string };

export type Copy = {
  nav: { about: string; projects: string; writing: string; contact: string; label: string; home: string };
  home: {
    title: string;
    description: string;
    status: string;
    subtitle: string;
    intro: string;
    readWriting: string;
    discuss: string;
    selectedWriting: string;
    allArticles: string;
    selectedWork: string;
    allProjects: string;
    workTitle: string;
    workBody: string;
    now: string;
    englishNote: string;
  };
  about: {
    title: string;
    description: string;
    intro: string[];
    experience: string;
    timeline: { title: string; body: string }[];
    education: string;
    languagesLabel: string;
    languages: string;
    press: string;
    beyond: string;
    beyondText: string;
    downloadCv: string;
  };
  projects: {
    title: string;
    description: string;
    intro: string;
    items: Record<string, ProjectCopy>;
    aiInProduction: string;
    read: string;
    draftPreview: string;
    archive: string;
    year: string;
    project: string;
    domain: string;
    archiveRows: ArchiveCopy[];
    more: string;
  };
  writing: {
    title: string;
    description: string;
    intro: string;
    categoriesLabel: string;
    category: string;
    topicsLabel: string;
    all: string;
    languageLabel: string;
    languages: Record<string, string>;
    article: string;
    articles: string;
    draft: string;
    englishNote: string;
    topicsFor: string;
  };
};
