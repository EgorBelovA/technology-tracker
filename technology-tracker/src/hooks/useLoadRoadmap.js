import { useTech } from '../context/TechnologiesContext';
import { useCallback, useRef, useEffect } from 'react';

export const ROADMAPS = [
  { id: 'ai-agents', label: 'AI Agents' },
  { id: 'ai-data-scientist', label: 'AI Data Scientist' },
  { id: 'ai-engineer', label: 'AI Engineer' },
  { id: 'ai-red-teaming', label: 'AI Red Teaming' },
  { id: 'android', label: 'Android Developer' },
  { id: 'angular', label: 'Angular Developer' },
  { id: 'api-design', label: 'API Design' },
  { id: 'aspnet-core', label: 'ASP.NET Core Developer' },
  { id: 'aws', label: 'AWS Engineer' },
  { id: 'backend', label: 'Backend Developer' },
  { id: 'blockchain', label: 'Blockchain Developer' },
  { id: 'cloudflare', label: 'Cloudflare Developer' },
  { id: 'computer-science', label: 'Computer Science' },
  { id: 'cpp', label: 'C++ Developer' },
  { id: 'cyber-security', label: 'Cyber Security Specialist' },
  { id: 'data-analyst', label: 'Data Analyst' },
  {
    id: 'datastructures-and-algorithms',
    label: 'Data Structures & Algorithms',
  },
  { id: 'devops', label: 'DevOps Engineer' },
  { id: 'devrel', label: 'Developer Relations (DevRel)' },
  { id: 'docker', label: 'Docker Roadmap' },
  { id: 'engineering-manager', label: 'Engineering Manager' },
  { id: 'frontend', label: 'Frontend Developer' },
  { id: 'full-stack', label: 'Full-Stack Developer' },
  { id: 'game-developer', label: 'Game Developer' },
  { id: 'git-github', label: 'Git & GitHub' },
  { id: 'graphql', label: 'GraphQL Developer' },
  { id: 'ios', label: 'iOS Developer' },
  { id: 'java', label: 'Java Developer' },
  { id: 'javascript', label: 'JavaScript Developer' },
  { id: 'kubernetes', label: 'Kubernetes Engineer' },
  { id: 'linux', label: 'Linux' },
  { id: 'mlops', label: 'MLOps Engineer' },
  { id: 'nodejs', label: 'Node.js Developer' },
  { id: 'php', label: 'PHP Developer' },
  { id: 'postgresql-dba', label: 'PostgreSQL DBA' },
  { id: 'product-manager', label: 'Product Manager' },
  { id: 'prompt-engineering', label: 'Prompt Engineering' },
  { id: 'python', label: 'Python Developer' },
  { id: 'qa', label: 'QA / Tester' },
  { id: 'react-native', label: 'React Native Developer' },
  { id: 'react', label: 'React Developer' },
  { id: 'redis', label: 'Redis Developer' },
  { id: 'rust', label: 'Rust Developer' },
  { id: 'server-side-game-developer', label: 'Server-Side Game Developer' },
  { id: 'software-architect', label: 'Software Architect' },
  {
    id: 'software-design-architecture',
    label: 'Software Design & Architecture',
  },
  { id: 'sql', label: 'SQL' },
  { id: 'system-design', label: 'System Design' },
  { id: 'technical-writer', label: 'Technical Writer' },
  { id: 'terraform', label: 'Terraform Engineer' },
  { id: 'typescript', label: 'TypeScript Developer' },
  { id: 'ux-design', label: 'UX Designer' },
  { id: 'vue', label: 'Vue Developer' },
];

export function useLoadRoadmap() {
  const { notify, handleJsonLoad } = useTech();

  const loadRoadmap = useCallback(
    async (roadmapId) => {
      const url = `https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/ed412ab0c2e4c7a14d5669d0d92fac287db1efcf/public/roadmap-content/${roadmapId}.json`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to download roadmap');

        const jsonText = await response.text();
        handleJsonLoad(jsonText);
      } catch (error) {
        console.error(error);
        notify(`Failed to load roadmap "${roadmapId}"`, 'error');
      }
    },
    [handleJsonLoad, notify]
  );

  const normalizeAndValidateUrl = (value) => {
    const trimmed = value.trim();

    if (/\s/.test(trimmed)) return null;

    try {
      const url = trimmed.startsWith('http')
        ? new URL(trimmed)
        : new URL(`https://${trimmed}`);

      if (!['http:', 'https:'].includes(url.protocol)) return null;

      const host = url.hostname;

      if (host === 'localhost') return url.href;

      if (!host.includes('.')) return null;

      if (host.startsWith('.') || host.endsWith('.') || host.includes('..')) {
        return null;
      }

      return url.href;
    } catch {
      return null;
    }
  };

  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  const userUrlRoadmap = useCallback(
    (roadmapUrl) => {
      clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        if (!roadmapUrl.trim()) return;

        const normalizedUrl = normalizeAndValidateUrl(roadmapUrl);
        if (!normalizedUrl) return;

        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
          const response = await fetch(normalizedUrl, {
            signal: controller.signal,
          });

          if (!response.ok) return;

          const jsonText = await response.text();
          handleJsonLoad(jsonText);
        } catch (err) {
          if (err.name !== 'AbortError') {
          }
        }
      }, 300);
    },
    [handleJsonLoad]
  );

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      clearTimeout(debounceRef.current);
    };
  }, []);

  return { ROADMAPS, loadRoadmap, userUrlRoadmap };
}
