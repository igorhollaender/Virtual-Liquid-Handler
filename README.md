Virtual-Liquid-Handler (VLH)
============================

Web-based 3D simulation of laboratory liquid handlers.

(2014-08-18)
This is a simulation tool for those who are working with laboratory robots (liquid handlers)
of different makes. Using 3D animation, it simulates the work protocols (processes), visually showing
how the robots moves labware (such as 96-well PCR plates) around, how it transfers liquids from source
to target wells etc. 

VLH is not bound to a specific hardware platform and different liquid handlers hardware setups can be easily
implemented. 

In the current implementation, it can be use for demonstration of the existing
protocols. The ultimate (currently very distant) aim is to create a tool which will use the current 
3D visualizer as a front-end, and different back-ends which will translate specific protocol implementations
on various real hardware into 3D-presentable VLH-runs. And vice-versa, it will allow for very intuitive
3D-based programming, and convert the general code VLH-code into hardware-specific robot programming languages.

This software is implemented as a webapp in javascript and X3DOM (www.x3dom.org). It runs in a WebGL-supporting
browser (tested in Firefox and Chrome).
