Theory
===
Main formula for watering: [source](http://www.irrigationtutorials.com/how-to-estimate-water-useage-required-for-an-irrigation-system/)


```
(Eto x PF x SF x 0.62 ) / IE  =  Gallons of Water per day
```
where:

```Eto```: Get this from http://www.rainmaster.com/historicET.aspx  
```PF```: This is the plant factor. Different plants need different amounts of water.  Use a value of 1.0 for lawn.  For water loving shrubs use .80, for average water use shrubs use 0.5, for low water use shrubs use 0.3.  
```SF```: This is the area to be irrigated in square feet.  So for a 30 foot x 50 foot lawn you would use 1500.  
```0.62```: A constant value used for conversion.  
```IE```: Irrigation efficiency.  Some irrigation water never gets used by the plant, this value compensates for that.  I suggest using 0.75 as the value for this.  Very well designed sprinkler systems with little run-off that using efficent sprinklers can have efficiencies of 80% (use 0.80).  Drip irrigation systems typically have efficiencies of 90% (use 0.90).

[Know How Much Water You Use](http://www.markham.ca/wps/portal/Markham/Residents/Water/WaterConserv/Conservation/!ut/p/a1/hY9RT4MwAIR_i3-gvdpS6mPtDGuBMDRsrC-GLYgkAwxOif9etuzJZPPeLvkud0c9Lanvq--2qY7t0FeHk_fy1VkYpmO4bKEktIKT8QpMPGEGtjNgIr0UYQKgiBawYf5YZGnMYeWffJoq2LW7t8lDgoyJSx5XpPFf_4b6MyKyyJhkrfI8j-Zeu9SBTTlMwC7ArYln4MYGR32768i07whIwCDApFRchQF4SDeG-q-fFxc1pze633HVUD_Wb_VYj-R9-DzScpom0gxDc6jJvqIfXVGiXXXPW333C3EXiHk!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/)


Code
===

```
npm install watering
```

Check `config` directory for default development parameters.
