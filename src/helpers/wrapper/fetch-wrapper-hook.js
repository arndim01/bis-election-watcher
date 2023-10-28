export const fetcher = async (url, token) => {
  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    let payload;  
    if (res.status === 204) return null; // 204 does not have body
    payload =  await res.json();
    if (res.ok) {
      return payload;
    } else {
      return { data:null, error:'failed' };
    }
  } catch (e) {
    return { data:null, error:'failed' };
  }
  
};

export const fetcherPost = async (api) => {
  try {
    const res = await fetch(api.url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(api.formData)
    });
    let payload;  
    if (res.status === 204) return null; // 204 does not have body
    payload =  await res.json();
    if (res.ok) {
      return payload;
    } else {
      return { data:null, error:'failed' };
    }
  } catch (e) {
    return { data:null, error:'failed' };
  }
}