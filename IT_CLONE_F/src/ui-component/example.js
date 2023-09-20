'@keyframes fadeIn': {
  from: { opacity: 0 },
  to: { opacity: 1 },
},
'@keyframes fadeOut': {
  from: { opacity: 1 },
  to: { opacity: 0 },
},
Slide in from left or right:
less
Copy code
'@keyframes slideInLeft': {
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' },
},
'@keyframes slideInRight': {
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
},
Scale up and down:
less
Copy code
'@keyframes scaleUp': {
  from: { transform: 'scale(0)' },
  to: { transform: 'scale(1)' },
},
'@keyframes scaleDown': {
  from: { transform: 'scale(1)' },
  to: { transform: 'scale(0)' },
},
Rotate:
less
Copy code
'@keyframes rotate': {
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
},
Bounce:
arduino
Copy code
'@keyframes bounce': {
  '0%': { transform: 'translateY(0)' },
  '20%': { transform: 'translateY(-10px)' },
  '40%': { transform: 'translateY(0)' },
  '60%': { transform: 'translateY(-5px)' },
  '80%': { transform: 'translateY(0)' },
  '100%': { transform: 'translateY(0)' },
},
Pulse:
less
Copy code
'@keyframes pulse': {
  from: { transform: 'scale(1)' },
  to: { transform: 'scale(1.2)' },
},
Color change:
less
Copy code
'@keyframes colorChange': {
  from: { color: '#000' },
  to: { color: '#fff' },
},
You can customize these @keyframes rules by adjusting the CSS properties and values to fit your specific needs.





