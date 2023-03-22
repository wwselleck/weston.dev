import * as React from "react";
import { renderHomePage } from "../templates/home-template";
import * as Data from "../services/data";
import { List } from "../services/lists";
import { Section, SectionItem } from "./IndexSection";
import { Page } from "../services/pages";
import { Context } from "../context";

interface IndexProps {
  projects: Array<Data.Project>;
  lists?: List[];
  posts: Page[];
}

interface ProjectsSectionProps {
  projects: IndexProps["projects"];
}
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <Section color="pink" name="Projects">
      {projects.map((project) => (
        <SectionItem
          name={`${project.emoji} ${project.title}`}
          href={project.link}
          desc={project.description}
        />
      ))}
    </Section>
  );
};

const IndexPage: React.FC<IndexProps> = ({ projects, lists, posts }) => {
  return (
    <div>
      <div className="flex mb-40 items-center">
        <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-blue-1 via-purple-1 to-pink-1 shrink-0 animate-[GradientAnimation_10s_ease_infinite] bg-[length:600%_600%] flex items-center justify-center mr-24">
          <div className="bg-me bg-contain rounded-full w-52 h-52 flex justify-center items-center"></div>
        </div>
        <div>
          <p className="text-2xl dark:text-text-light">
            Hi, I'm <b>Weston Selleck</b>. I'm a software developer currently
            working at <b>Atlassian</b>. Please enjoy this complimentary{" "}
            <span id="dragItemName">lollipop</span> during your stay on my
            website <span id="dragItem"></span>.
          </p>
          <div className="flex justify-center mt-9 text-lg">
            {[].map((link) => {
              return (
                <span className="inline-flex align-center after:content-['\00b7'] after:mx-4 last:after:content-['']">
                  {link.iconUrl && (
                    <img className="w-6 h-6 mr-2" src={link.iconUrl} alt="" />
                  )}
                  <a href={link.href}>{link.text}</a>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-3/5 mx-auto">
        <ProjectsSection projects={projects} />
        <Section color="blue" name="Lists">
          {lists?.map((list) => {
            return (
              <SectionItem href={`./lists/${list.id}`} name={list.title} />
            );
          })}
        </Section>
        <Section color="purple" name="Posts">
          {posts
            .sort((p1, p2) => {
              return p1.title.localeCompare(p2.title);
            })
            .map((post) => {
              return <SectionItem href={post.permalink} name={post.title} />;
            })}
        </Section>
      </div>
    </div>
  );
};

export const page = {
  title: "",
  published: true,
  renderToHTML: async (context: Context) => {
    const lists = await context.lists.getLists();
    const allPages = await context.pages.getAllPages();
    const posts = allPages.filter((page) => {
      const excludedPermalinkPatterns = [/^\/$/, /^\/all/];
      return !excludedPermalinkPatterns.some((rgx) => rgx.test(page.permalink));
    });
    return renderHomePage(
      <IndexPage lists={lists} posts={posts} projects={context.data.projects} />
    );
  },
};
