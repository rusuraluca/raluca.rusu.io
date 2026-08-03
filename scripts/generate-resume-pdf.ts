#!/usr/bin/env tsx
/**
 * Generate resume PDF from about/data.json using @react-pdf/renderer
 *
 * Run: npx tsx scripts/generate-resume-pdf.ts
 * Output: public/resume.pdf
 */

import { renderToFile } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import fs from "node:fs";
import path from "node:path";
import React from "react";

const dataPath = path.join(process.cwd(), "content", "about", "data.json");
const outputPath = path.join(process.cwd(), "public", "resume.pdf");

type AboutData = {
  name: string;
  title: string;
  tagline: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
    website: string;
  };
  experience: {
    company: string;
    role: string;
    location: string;
    dates: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    dates: string;
  }[];
  skills: string[];
  awards: { title: string; year: string }[];
};

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    padding: 40,
    color: "#1a1a2e",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: "#e85d4c",
    marginBottom: 8,
  },
  contact: {
    fontSize: 9,
    color: "#6b7280",
    flexDirection: "row",
    gap: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a2e",
    paddingBottom: 4,
    marginBottom: 10,
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  entryTitle: {
    fontWeight: 600,
  },
  entryMeta: {
    fontSize: 9,
    color: "#6b7280",
  },
  list: {
    paddingLeft: 12,
    marginTop: 4,
  },
  listItem: {
    marginBottom: 2,
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skill: {
    backgroundColor: "#f4f0e6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 9,
  },
  link: {
    color: "#e85d4c",
    textDecoration: "none",
  },
});

function ResumePDF({ data }: { data: AboutData }) {
  return React.createElement(
    Document,
    { title: `${data.name} - Resume`, author: data.name },
    React.createElement(
      Page,
      { size: "A4", style: styles.page },

      // Header
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(Text, { style: styles.name }, data.name),
        React.createElement(Text, { style: styles.title }, data.title),
        React.createElement(
          View,
          { style: styles.contact },
          React.createElement(Text, null, data.contact.email),
          React.createElement(Text, null, " · "),
          React.createElement(
            Link,
            { src: data.contact.website, style: styles.link },
            data.contact.website.replace("https://", "")
          ),
          React.createElement(Text, null, " · "),
          React.createElement(
            Link,
            { src: data.contact.github, style: styles.link },
            "GitHub"
          ),
          React.createElement(Text, null, " · "),
          React.createElement(
            Link,
            { src: data.contact.linkedin, style: styles.link },
            "LinkedIn"
          )
        )
      ),

      // Experience
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Experience"),
        ...data.experience.map((job, i) =>
          React.createElement(
            View,
            { key: i, style: styles.entry },
            React.createElement(
              View,
              { style: styles.entryHeader },
              React.createElement(
                Text,
                { style: styles.entryTitle },
                `${job.role} · ${job.company}`
              ),
              React.createElement(
                Text,
                { style: styles.entryMeta },
                `${job.dates} · ${job.location}`
              )
            ),
            React.createElement(
              View,
              { style: styles.list },
              ...job.highlights.map((h, j) =>
                React.createElement(
                  Text,
                  { key: j, style: styles.listItem },
                  `• ${h}`
                )
              )
            )
          )
        )
      ),

      // Education
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Education"),
        ...data.education.map((edu, i) =>
          React.createElement(
            View,
            { key: i, style: styles.entry },
            React.createElement(
              View,
              { style: styles.entryHeader },
              React.createElement(
                Text,
                { style: styles.entryTitle },
                `${edu.degree} · ${edu.institution}`
              ),
              React.createElement(Text, { style: styles.entryMeta }, edu.dates)
            )
          )
        )
      ),

      // Skills
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Skills"),
        React.createElement(
          View,
          { style: styles.skillsContainer },
          ...data.skills.map((skill, i) =>
            React.createElement(Text, { key: i, style: styles.skill }, skill)
          )
        )
      ),

      // Awards
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Awards"),
        ...data.awards.map((award, i) =>
          React.createElement(
            View,
            { key: i, style: styles.entryHeader },
            React.createElement(Text, null, award.title),
            React.createElement(Text, { style: styles.entryMeta }, award.year)
          )
        )
      )
    )
  );
}

async function main() {
  console.log("Reading about data...");
  const data: AboutData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  console.log("Generating PDF...");
  const doc = React.createElement(ResumePDF, { data });
  await renderToFile(doc, outputPath);

  console.log(`✓ Resume PDF generated: ${outputPath}`);
}

main().catch((err) => {
  console.error("Failed to generate PDF:", err);
  process.exit(1);
});
