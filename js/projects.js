const username = 'EmSalce';
const projectsContainer = document.getElementById('projects');

async function fetchProjects() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    const sortedRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    sortedRepos.forEach((repo) => {
      const card = document.createElement('div');
      card.classList.add('project-card');

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description provided.'}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      `;

      projectsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    projectsContainer.innerHTML =
      '<p>Failed to load projects. Please try again later.</p>';
  }
}

fetchProjects();
