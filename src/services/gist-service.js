export async function GetGistList(username, pageSize, page = 1) {
  const r = await fetch(`https://api.github.com/users/${username}/gists?per_page=${pageSize}&page=${page}`);
  const response = await r.json();
  if (r.status !== 200) {
    if (response.message) {
      throw new Error(response.message);
    }

    throw new Error(`Failed with status ${r.status}`);
  }

  return response.map((gist) => ({
    id: gist.id,
    url: gist.html_url,
    description: gist.description,
    filetypes: Object.keys(gist.files).map((i) => gist.files[i].language).filter(Boolean),
  }));
}

export async function GetGistForks(gistId, limit = 3) {
  const r = await fetch(`https://api.github.com/gists/${gistId}/forks?per_page=${limit}`);
  const response = await r.json();
  if (r.status !== 200) {
    if (response.message) {
      throw new Error(response.message);
    }

    throw new Error(`Failed with status ${r.status}`);
  }

  return response.map((fork) => ({
    id: fork.id,
    url: fork.html_url,
    owner: {
      login: fork.owner.login,
      avatar: fork.owner.avatar_url,
    },
  }));
}
