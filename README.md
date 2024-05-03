# VR_Bus_2

VR_Bus_2 is a non-VR and VR simulator of a realistic bus driving experience. Third-person perspective is available in non-VR mode, while both first and third person perspective are available in VR mode.
This project was built primarily over the course of 11 weeks and getting consistent updates in features

## How to install
### Clone the repository
#### 1. Clone repository
In Git Bash, go to your desirable directory, and clone the repository 
```cpp
git clone https://github.com/giaphutran/VR_Bus_2.git
```

#### 2. Install dependencies
Check if python is installed on your machine by typing "python" to your command line

```cpp
python
```

If python is installed, it will show you something like this
```cpp
Python 3.12.3 (tags/v3.12.3:f6650f9, Apr  9 2024, 14:05:25) [MSC v.1938 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
```

If python is NOT installed, it will automatically lead you to microsoft store to install python. Just click "Get" and wait for the installation
However, if it show you something like this

```cpp
Python was not found; run without arguments to install from the Microsoft Store, or disable this shortcut from Settings > Manage App Execution Aliases.
```

or

```cpp
'python' is not recognized as an internal or external command,
operable program or batch file.
```

then you just better off go to the python original page and install it. Make sure to tick "add python to PATH" at the end of the installation
```cpp
https://www.python.org/downloads/
```

After that, install pip.
Since Python 3.4 and Python 2.7.9, Python installation already comes with pip.
Run this line to check if pip is installed
```cpp
pip --version
``` 
If pip is installed, it will show you something like this
```cpp
pip 24.0 from C:\Program Files\WindowsApps\PythonSoftwareFoundation.Python.3.12_3.12.1008.0_x64__qbz5n2kfra8p0\Lib\site-packages\pip (python 3.12)
```
If pip is NOT installed, it will show you something like this
```cpp
'pip' is not recognized as an internal or external command, operable program or batch file.
```
In the case where pip is NOT installed, run these 2 lines separately, in the order shown to install pip
```cpp
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```
```cpp
python get-pip.py
```
Successful installation of pip will look something like this 
```cpp
Successfully installed pip -22.1.2 wheel-0.37.1
```
If you are not successful using this way, try reading the article in this link and see if it works https://www.geeksforgeeks.org/how-to-install-pip-on-windows/


Then, install Node.js

Go to this link
```cpp
https://nodejs.org/en/download
```
```

## Showcase 

### Cannon.js Debugging environment

![alt text](<showcasing and tutorial/vr bus debug.gif>)

### Actual non-VR gameplay


![alt text](<showcasing and tutorial/non debug vr bus 10s.gif>)

## User Manual

For VR-mode (Base on Meta Quest 2 controller layout):

Left joystick: Move forward to accelerate, backward to decelerate.

[](README.md) ![text](<showcasing and tutorial/image.png>) ![alt text](<showcasing and tutorial/image-1.png>)

Right joystick: Move left to steer left, right to steer right.

  ![alt text](<showcasing and tutorial/image-2.png>) ![alt text](<showcasing and tutorial/image-3.png>)

“A” button on the right joystick: Press once to mute all sound. Press again to unmute.


 ![alt text](<showcasing and tutorial/image-4.png>)

“B” button on the right joystick: Press once to switch to 3rd person view. Press again to revert to 1st person view.


 ![alt text](<showcasing and tutorial/image-5.png>)

“X” button on the left joystick: Press once to reset the vehicle if flipped.


![alt text](<showcasing and tutorial/image-5.png>)

The HUD at the upper right shows time elapsed since the game started, as well as the button layout.


 [](README.md) ![text](<showcasing and tutorial/image-7.png>)

For non-VR mode (Keyboard):
“WASD”: Press W to accelerate. Press S to decelerate or reverse the bus.
Press A/D to steer left/right.


 ![alt text](<showcasing and tutorial/image-8.png>)

“F”: Press once to mute all sound. Press again to unmute.

 
 [](README.md) ![text](<showcasing and tutorial/image-9.png>)

“C”: Press once to reset the vehicle if flipped.

  [](README.md) ![text](<showcasing and tutorial/image-10.png>)

The HUD at the upper left shows time elapsed since the game started, as well as the button layout

[](README.md) ![text](<showcasing and tutorial/image-11.png>)
 
