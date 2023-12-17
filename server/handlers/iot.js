async function authAdmin() {
  const apiUrlAuth = `${process.env.THINGSBOARD_URL}/api/auth/login`;
  const formDataAuth = {
    username: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };
  const response = await fetch(apiUrlAuth, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataAuth),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  return data.token;
}

async function authUser(req) {
  const { username, password } = req.body;
  const apiUrl = `${process.env.THINGSBOARD_URL}/api/auth/login`;
  const formData = {
    username,
    password,
  };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  return data;
}

async function logoutUser(req) {
  const apiUrl = `${process.env.THINGSBOARD_URL}/api/auth/logout`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "X-Authorization": `Bearer ${req.cookies.jwttoken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}

async function getUserData(jwttoken) {
  const apiUrl = `${process.env.THINGSBOARD_URL}/api/auth/user`;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Authorization": `Bearer ${jwttoken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  return data;
}

async function getDevices(req) {
  const { customerId } = req.query;
  const apiUrl = `${process.env.THINGSBOARD_URL}/api/customer/${customerId}/deviceInfos?pageSize=100&page=0&sortProperty=createdTime&sortOrder=DESC`;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Authorization": `Bearer ${req.cookies.jwttoken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  return data;
}

// create customer
async function createCustomer(customerName) {
  const apiUrlCreateCustomer = `${process.env.THINGSBOARD_URL}/api/customer`;
  const formDataCreateCustomer = {
    title: customerName,
  };

  const response = await fetch(apiUrlCreateCustomer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": `Bearer ${jwttoken}`,
    },
    body: JSON.stringify(formDataCreateCustomer),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  return data;
}

async function checkAndCreateCustomer(jwttoken) {
  let customer;
  const apiUrlFetchCustomers = `${process.env.THINGSBOARD_URL}/api/customers?pageSize=100&page=0`;
  const response = await fetch(apiUrlFetchCustomers, {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": `Bearer ${jwttoken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  const customers = data.data.map((customer) => {
    return {
      name: customer.name,
      id: customer.id.id,
      tenantId: customer.tenantId.id,
    };
  });

  const customerFound = customers.filter(
    (customer) => customer.name === process.env.CUSTOMER
  );

  if (customerFound.length) {
    customer = customerFound[0];
  } else {
    // create customer
    const customerData = await createCustomer(process.env.CUSTOMER);
    customer = {
      name: customerData.name,
      id: customerData.id.id,
      tenantId: customerData.tenantId.id,
    };
  }

  return customer;
}

async function createUser(req, jwttoken, customer) {
  const { email, firstName, lastName } = req.body;
  const apiUrlCreateUser = `${process.env.THINGSBOARD_URL}/api/user?sendActivationMail=false`;
  const formDataCreateUser = {
    tenantId: {
      id: customer.tenantId,
      entityType: "TENANT",
    },
    customerId: {
      id: customer.id,
      entityType: "CUSTOMER",
    },
    email,
    firstName,
    lastName,
    authority: "CUSTOMER_USER",
  };

  const response = await fetch(apiUrlCreateUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": `Bearer ${jwttoken}`,
    },
    body: JSON.stringify(formDataCreateUser),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  return data;
}

async function getUserActivationToken(jwttoken, user) {
  const apiUrlActivationToken = `${process.env.THINGSBOARD_URL}/api/user/${user.id.id}/activationLink`;
  const response = await fetch(apiUrlActivationToken, {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": `Bearer ${jwttoken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.text();

  return data;
}

async function setUserPassword(req, jwttoken, activateToken) {
  const { password } = req.body;
  const apiUrlActivationUrl =
    "http://localhost:8080/api/noauth/activate?sendActivationMail=false";
  const formDataSetPassword = {
    activateToken,
    password,
  };

  const response = await fetch(apiUrlActivationUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": `Bearer ${jwttoken}`,
    },
    body: JSON.stringify(formDataSetPassword),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  return data;
}

async function createDevice(req, jwttoken) {
  const { deviceName, accessToken } = req.body;
  const apiUrl = `${process.env.THINGSBOARD_URL}/api/device-with-credentials`;
  const formData = {
    device: {
      name: deviceName,
      label: "",
      type: "default",
    },
    credentials: {
      credentialsType: "ACCESS_TOKEN",
      credentialsId: accessToken,
    },
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "X-Authorization": `Bearer ${jwttoken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  
  return data.id.id;
}

async function assignDeviceToCustomer(req, jwttoken, deviceId) {
  const { customerId } = req.body;
  const apiUrlSetDevice = `${process.env.THINGSBOARD_URL}/api/customer/${customerId}/device/${deviceId}`;
  const response = await fetch(apiUrlSetDevice, {
    method: "POST",
    headers: {
      "X-Authorization": `Bearer ${jwttoken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}

module.exports = {
  authAdmin,
  authUser,
  logoutUser,
  getUserData,
  getDevices,
  checkAndCreateCustomer,
  createUser,
  getUserActivationToken,
  setUserPassword,
  createDevice,
  assignDeviceToCustomer,
};
