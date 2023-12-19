export async function deleteDevice(deviceId) {
  const apiUrl = `/iot/customer/device/?deviceId=${deviceId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
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
