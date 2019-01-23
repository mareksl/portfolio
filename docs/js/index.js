(function() {
  const projectListItems = document.querySelectorAll('.project-list__item');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.intersectionRatio >= 0.5) {
          setTimeout(() => {
            entry.target.classList.add('project-list__item--in-view');
          }, i * 100);
        } else if (entry.intersectionRatio < 0.5) {
          entry.target.classList.remove('project-list__item--in-view');
        }
      });
    },
    {
      threshold: [0, 0.5]
    }
  );

  projectListItems.forEach(el => {
    observer.observe(el);
  });
})();
