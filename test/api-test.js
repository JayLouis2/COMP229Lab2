const axios = require('axios');

const BASE = process.env.BASE_URL || 'http://localhost:5000/api';

async function run() {
  try {
    console.log('Running API smoke tests against', BASE);

    // Contacts CRUD
    const contact = { firstname: 'Test', lastname: 'Contact', email: 'test.contact@example.com' };
    let res = await axios.post(`${BASE}/contacts`, contact);
    console.log('Contacts POST:', res.status, res.data._id || res.data);
    const contactId = res.data._id;

    res = await axios.get(`${BASE}/contacts`);
    console.log('Contacts GET all:', res.status, Array.isArray(res.data) ? res.data.length : 0);

    res = await axios.get(`${BASE}/contacts/${contactId}`);
    console.log('Contacts GET by id:', res.status, res.data._id);

    res = await axios.put(`${BASE}/contacts/${contactId}`, { lastname: 'Updated' });
    console.log('Contacts PUT:', res.status, res.data.lastname);

    res = await axios.delete(`${BASE}/contacts/${contactId}`);
    console.log('Contacts DELETE:', res.status, res.data.message || res.data);

    // Projects CRUD
    const project = { title: 'Test Project', completion: new Date().toISOString(), description: 'desc' };
    res = await axios.post(`${BASE}/projects`, project);
    console.log('Projects POST:', res.status, res.data._id);
    const projectId = res.data._id;
    res = await axios.get(`${BASE}/projects/${projectId}`);
    console.log('Projects GET by id:', res.status, res.data.title);
    await axios.delete(`${BASE}/projects/${projectId}`);

    // Services CRUD
    const service = { title: 'Test Service', description: 'svc desc' };
    res = await axios.post(`${BASE}/services`, service);
    console.log('Services POST:', res.status, res.data._id);
    const serviceId = res.data._id;
    await axios.delete(`${BASE}/services/${serviceId}`);

    // Users CRUD
    const user = { firstname: 'Api', lastname: 'User', email: `api.user.${Date.now()}@example.com`, password: 'pass' };
    res = await axios.post(`${BASE}/users`, user);
    console.log('Users POST:', res.status, res.data._id);
    const userId = res.data._id;
    await axios.delete(`${BASE}/users/${userId}`);

    console.log('\nAPI smoke tests completed successfully.');
  } catch (err) {
    if (err.response) {
      console.error('Request failed:', err.response.status, err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    process.exit(2);
  }
}

run();
