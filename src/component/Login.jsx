const loginUser = async () => {
    try {
      const response = await fetch("https://assignment.stage.crafto.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "sandy", password: "yourpassword" }) // Replace with actual credentials
      });
  
      const data = await response.json();
      localStorage.setItem('token', data.token);  // Store token in local storage
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  