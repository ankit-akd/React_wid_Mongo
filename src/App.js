import { useState } from "react";
function App(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

   
    const handleOnSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
    
        if (result) {
          alert('Data saved successfully');
          setEmail('');
          setName('');
        } else {
          console.log('Data not saved. Check the server response.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    };
    

    return(
        <>
            <h1>Hello React + MongoDB</h1>
            <form action="">
                <input type="text" placeholder="name"
                value={name} onChange={(e) =>setName(e.target.value)} />
                <input type="email" placeholder="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type= "submit" onClick={handleOnSubmit}>Save Data</button>
            </form>
        </>
    )
}

export default App;
