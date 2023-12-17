export async function fetchDevices(user) {
  const apiUrl = `/iot/customer/deviceInfos?customerId=${user.customerId.id}&userId=${user.id.id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function getUserInfo() {
  const apiUrl = "/iot/auth/user";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function logout() {
  const apiUrl = "/iot/auth/logout";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error:", error.message);
    return false;
  }
}
