import { useState, useEffect } from 'react';
import { useNotification } from '../components/NotificationProvider';

const deepEqual = (a, b) => {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => deepEqual(a[key], b[key]));
};

export function useTechnologies() {
  const [technologies, setTechnologies] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [scrollUpVisible, setScrollUpVisible] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectCards, setSelectCards] = useState(false);

  const { notify } = useNotification();

  useEffect(() => {
    const saved = localStorage.getItem('roadmap-technologies');
    if (!saved) return;

    try {
      setTechnologies(JSON.parse(saved));
    } catch (e) {
      console.error('LocalStorage load error:', e);
    }
  }, []);

  useEffect(() => {
    if (technologies.length > 0) setShowExport(true);
    localStorage.setItem('roadmap-technologies', JSON.stringify(technologies));
  }, [technologies]);

  const handleJsonLoad = (json) => {
    let data;

    try {
      data = JSON.parse(json);
    } catch (e) {
      notify('Invalid JSON, check your file', 'error');
      return;
    }

    const newTech = Object.entries(data).map(([id, tech]) => ({
      id,
      ...tech,
      status: tech.status ?? 'not-started',
    }));

    const sortedOld = [...technologies].sort((a, b) =>
      a.id.localeCompare(b.id)
    );
    const sortedNew = [...newTech].sort((a, b) => a.id.localeCompare(b.id));

    const isSame =
      sortedOld.length === sortedNew.length &&
      sortedOld.every((t, i) => deepEqual(t, sortedNew[i]));

    if (isSame) {
      notify('Loaded data is identical to current data', 'warning');
      return;
    }

    const missingTitles = newTech.filter((t) => !t.title).map((t) => t.id);

    if (missingTitles.length > 0) {
      notify(`Some items are missing the required "title" field`, 'warning');
    } else {
      notify('Technologies loaded', 'success');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTechnologies(newTech);
  };

  const updateTechnologyStatus = (
    id,
    newStatus,
    deadline,
    progressNote,
    links
  ) => {
    setTechnologies((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: newStatus, deadline, progressNote, links }
          : t
      )
    );
    notify('Technology status updated', 'success');
  };

  const clearStorage = () => {
    localStorage.removeItem('roadmap-technologies');
    setTechnologies([]);
    notify('Data cleared', 'info');
  };

  const updateAllStatuses = (newStatus) => {
    setTechnologies((prev) => prev.map((t) => ({ ...t, status: newStatus })));
  };

  const handleRandomSelect = () => {
    const notCompleted = technologies.filter(
      (tech) => tech.status !== 'completed'
    );
    if (notCompleted.length === 0) return;

    const randomTech =
      notCompleted[Math.floor(Math.random() * notCompleted.length)];
    setSelectedTech(randomTech.id);

    const el = document.getElementById(randomTech.id);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('highlighted');

            setTimeout(() => el.classList.remove('highlighted'), 1000);

            observerInstance.disconnect();
          }
        });
      },
      {
        root: null,
        threshold: 1,
      }
    );

    observer.observe(el);
  };

  useEffect(() => {
    const onScroll = () => setScrollUpVisible(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: Math.min(window.scrollY, 1500) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCardSelection = (technology) => {
    setSelectedCards((prev) => {
      const exists = prev.some((t) => t.id === technology.id);
      return exists
        ? prev.filter((t) => t.id !== technology.id)
        : [...prev, technology];
    });
  };

  const toggleSelectMode = () => setSelectCards((v) => !v);

  useEffect(() => {
    if (!selectCards) {
      setSelectedCards([]);
    }
  }, [selectCards]);

  const updateSelectedCardsStatus = (newStatus) => {
    setTechnologies((prev) =>
      prev.map((t) =>
        selectedCards.some((s) => s.id === t.id)
          ? { ...t, status: newStatus }
          : t
      )
    );
    notify(
      `Selected cards marked as "${newStatus.replace('-', ' ')}"`,
      'success'
    );
  };

  return {
    technologies,
    setTechnologies,
    showExport,
    selectedTech,
    scrollUpVisible,
    selectedCards,
    selectCards,
    selectedCardsAmount: selectedCards.length,

    handleJsonLoad,
    updateTechnologyStatus,
    clearStorage,
    updateAllStatuses,
    handleRandomSelect,
    scrollToTop,
    toggleCardSelection,
    toggleSelectMode,
    updateSelectedCardsStatus,
    setSelectCards,
  };
}
