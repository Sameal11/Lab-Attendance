// static/script.js

async function scanBluetooth() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      });
  
      const studentName = device.name || "";
  
      const res = await fetch('/mark-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName })
      });
  
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Bluetooth scan cancelled or failed.");
    }
  }
  