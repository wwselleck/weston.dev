import * as React from "react";

import { Config } from '../../../config';
import * as Dates from "../../../lib/date";
import { Section, SectionItem } from './IndexSection';

interface IndexProps {
  links: Array<{ text: string; href: string, iconUrl?: string }>;
  projects: Array<{
    link: string;
    title: string;
    description: string;
    emoji: string;
  }>;
  commit?: {
    link: string;
    repo: {
      name: string;
      link: string;
    };
    message: string;
    date: Date;
  };
  lists?: Config['lists'];
}

export const IndexPage = ({ projects, links, commit, lists }: IndexProps) => {
  return (
    <div>
      <div className="w-4/5 mx-auto my-52 max-w-5xl">
        <div className="flex mb-40">
          <div className="bg-me bg-contain rounded-full w-52 h-52 flex justify-center items-center mr-16">
            <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-blue-1 via-purple-1 to-pink -z-10 shrink-0 animate-[GradientAnimation_10s_ease_infinite] bg-[length:600%_600%]"></div>
          </div>
          <div>
            <p className="text-2xl">
              Hi, I'm <b>Weston Selleck</b>. I'm a software developer
              currently working at <b>Atlassian</b> on Trello. Please enjoy this complimentary <span id="dragItemName">lollipop</span> during your stay on my website <span id="dragItem"></span>.
            </p>
            <div className="flex justify-center mt-9 text-lg">
              {links.map(link => {
                return <span className="inline-flex align-center after:content-['\00b7'] after:mx-4 last:after:content-['']">
                  {link.iconUrl && <img className="w-6 h-6 mr-2" src={link.iconUrl} alt="" />}
                  <a href={link.href}>{link.text}</a>
                </span>
              })}
            </div>
          </div>
        </div>
        <div className="w-3/5 mx-auto">
          <ProjectsSection projects={projects} />
          <Section color="blue" name="Lists">
            {lists.map(list => {
              return <SectionItem href={`./lists/${list.id}`} name={list.display}/>
            })}
          </Section>
          <Section color="purple" name="Writing">
            <SectionItem
              href="/writing/every-pinball-game"
              name="🚧 Every Pinball Game"
              />
          </Section>
          <div className="mt-24 mb-8 flex justify-center">
            <MostRecentCommit commit={commit} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectsSectionProps {
  projects: IndexProps['projects'];
}
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return <Section color="pink" name="Projects">
    {projects.map(project => <SectionItem name={`${project.emoji} ${project.title}`} href={project.link} desc={project.description}/>)}
  </Section>

}

export const MostRecentCommit = ({
  commit,
}: {
  commit: IndexProps["commit"];
}) => {
  if (!commit) {
    return null;
  }

  const possibleDateColors = ["#f2a100", "#db2500", "#ba02db", "#00cf87"];
  const dateColor =
    possibleDateColors[
    Math.floor(Math.random() * Math.floor(possibleDateColors.length))
    ];


  return (
    <div className="flex items-center text-sm">
      <img src="./public/Git-Icon-Black.png" alt="Git logo" className="w-5" />
      <p className="font-medium pl-2">
        <a target="_blank" href={commit.repo.link} className="hover:underline">
          {commit.repo.name}
        </a>
      </p>
      <p className="pl-2">
        <a target="_blank" href={commit.link} className="no-underline">
          {commit.message}
        </a>
      </p>
      <p className="pl-2" style={{ color: dateColor }}>
        {Dates.timeSince(commit.date)}
      </p>
    </div>
  );
};
