const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { send } = require("process");
const url = require("url");

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.post("/iot/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const apiUrl = "http://localhost:8080/api/auth/login";
  const formData = {
    username,
    password,
  };

  try {
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
    res.cookie("jwttoken", data.token);
    res.status(200).send();
  } catch (error) {
    res.status(401).send();
    console.error("Error:", error.message);
  }
});

app.get("/iot/tenant/deviceInfos", async (req, res) => {
  // console.log(req.cookies.jwttoken)
  const apiUrl =
    "http://localhost:8080/api/tenant/deviceInfos?pageSize=100&page=0";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Authorization": `Bearer ${req.cookies.jwttoken}`,
        "Content-Type": "application/json", // Adjust this header based on your API requirements
        // Add any other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send();
    console.error("Error:", error);
  }
});

app.post("/iot/user", async (req, res) => {
  // tenant auth
  const apiUrlAuth = "http://localhost:8080/api/auth/login";
  const formDataAuth = {
    username: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };

  let jwttoken = "";

  try {
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
    jwttoken = data.token;
  } catch (error) {
    console.error("Error:", error.message);
  }

  let customer = {};

  // TODO check if customer exist
  const apiUrlFetchCustomers =
    "http://localhost:8080/api/customers?pageSize=100&page=0";
  try {
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
  } catch (error) {
    console.error("Error:", error);
  }

  // create customer
  async function createCustomer(customerName) {
    const apiUrlCreateCustomer = "http://localhost:8080/api/customer";
    const formDataCreateCustomer = {
      title: customerName,
    };

    try {
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
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // create user
  const { email, firstName, lastName } = req.body;
  console.log(customer);
  const apiUrlCreateUser =
    "http://localhost:8080/api/user?sendActivationMail=false";
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

  let user = {};

  try {
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
    user = data;
  } catch (error) {
    console.error("Error:", error);
  }

  // get activation token
  const apiUrlActivationToken = `http://localhost:8080/api/user/${user.id.id}/activationLink`;

  let link = "";

  try {
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
    link = data;
  } catch (error) {
    console.error("Error:", error);
  }

  // activate by link

  const parsedUrl = new URL(link);
  const activateToken = parsedUrl.searchParams.get("activateToken");

  // set password to user
  const { password } = req.body;
  const apiUrlActivationUrl =
    "http://localhost:8080/api/noauth/activate?sendActivationMail=false";
  const formDataSetPassword = {
    activateToken,
    password,
  };

  let userData = {};

  try {
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
    userData = data;
  } catch (error) {
    console.error("Error:", error);
  }

  res.cookie("jwttoken", userData.token);
  res.status(201).send();
});

app.post("/iot/auth/logout", async (req, res) => {
  // console.log(req.cookies.jwttoken)
  const apiUrl = "http://localhost:8080/api/auth/logout";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "X-Authorization": `Bearer ${req.cookies.jwttoken}`,
        "Content-Type": "application/json", // Adjust this header based on your API requirements
        // Add any other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    res.cookie("jwttoken", "");
    // const data = await response.json();
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
    console.error("Error:", error);
  }
});

app.get("/iot/auth/user", async (req, res) => {
  console.log(req.cookies.jwttoken);
  const apiUrl = "http://localhost:8080/api/auth/user";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Authorization": `Bearer ${req.cookies.jwttoken}`,
        "Content-Type": "application/json", // Adjust this header based on your API requirements
        // Add any other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send();
    console.error("Error:", error);
  }
});

app.get("/iot/customer/deviceInfos", async (req, res) => {
  const customerId = req.query.customerId;
  const apiUrl = `http://localhost:8080/api/customer/${customerId}/deviceInfos?pageSize=100&page=0&sortProperty=createdTime&sortOrder=DESC`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Authorization": `Bearer ${req.cookies.jwttoken}`,
        "Content-Type": "application/json", // Adjust this header based on your API requirements
        // Add any other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send();
    console.error("Error:", error);
  }
});

app.post("/iot/device-with-credentials", async (req, res) => {
  const { deviceName, accessToken, customerId } = req.body;
  console.log(req.body);
  // get tenant access first

  // tenant auth
  const apiUrlAuth = "http://localhost:8080/api/auth/login";
  const formDataAuth = {
    username: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };

  let jwttoken = "";

  try {
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
    jwttoken = data.token;
  } catch (error) {
    console.error("Error:", error.message);
  }

  // create device
  const apiUrl = "http://localhost:8080/api/device-with-credentials";
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

  let deviceId = "";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "X-Authorization": `Bearer ${jwttoken}`,
        "Content-Type": "application/json", // Adjust this header based on your API requirements
        // Add any other headers as needed
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    deviceId= data.id.id;
    // res.status(201).send();
  } catch (error) {
    res.status(401).send();
    console.error("Error:", error.message);
  }

  // set device to customer
  const apiUrlSetDevice = `http://localhost:8080/api/customer/${customerId}/device/${deviceId}`;

  try {
    const response = await fetch(apiUrlSetDevice, {
      method: "POST",
      headers: {
        "X-Authorization": `Bearer ${jwttoken}`,
        "Content-Type": "application/json", // Adjust this header based on your API requirements
        // Add any other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    res.status(201).send();
  } catch (error) {
    res.status(401).send();
    console.error("Error:", error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
