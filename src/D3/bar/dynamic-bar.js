const width = 1200;
const height = 800;
const position = {
    left: 100,
    top: 50,
    right: 100,
    bottom: 50
};
const innerWidth = width - position.left - position.right;
const innerHeight = height - position.top - position.bottom;

const mainSvg = d3.select('#main').attr('width', width).attr('height', height);
const mainGroup = mainSvg
    .append('g')
    .attr('height', innerHeight)
    .attr('width', innerWidth)
    .attr('transform', `translate(${position.left}, ${position.top})`);
const data = [
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2011,
        id: 'PS2-2011'
    },
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2012,
        id: 'PS2-2012'
    },
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2013,
        id: 'PS2-2013'
    },
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2014,
        id: 'PS2-2014'
    },
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2015,
        id: 'PS2-2015'
    },
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2016,
        id: 'PS2-2016'
    },
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2017,
        id: 'PS2-2017'
    },
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2018,
        id: 'PS2-2018'
    },
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2019,
        id: 'PS2-2019'
    },
    {
        platform: 'PS2',
        globalsale: 1233.46,
        year: 2020,
        id: 'PS2-2020'
    },
    {
        platform: 'PS2',
        globalsale: 1232.99,
        year: 2010,
        id: 'PS2-2010'
    },
    {
        platform: 'PS2',
        globalsale: 1227.36,
        year: 2009,
        id: 'PS2-2009'
    },
    {
        platform: 'PS2',
        globalsale: 1200.91,
        year: 2008,
        id: 'PS2-2008'
    },
    {
        platform: 'PS2',
        globalsale: 1147.08,
        year: 2007,
        id: 'PS2-2007'
    },
    {
        platform: 'PS2',
        globalsale: 1071.08,
        year: 2006,
        id: 'PS2-2006'
    },
    {
        platform: 'X360',
        globalsale: 969.61,
        year: 2016,
        id: 'X360-2016'
    },
    {
        platform: 'X360',
        globalsale: 969.61,
        year: 2017,
        id: 'X360-2017'
    },
    {
        platform: 'X360',
        globalsale: 969.61,
        year: 2018,
        id: 'X360-2018'
    },
    {
        platform: 'X360',
        globalsale: 969.61,
        year: 2019,
        id: 'X360-2019'
    },
    {
        platform: 'X360',
        globalsale: 969.61,
        year: 2020,
        id: 'X360-2020'
    },
    {
        platform: 'X360',
        globalsale: 968.78,
        year: 2015,
        id: 'X360-2015'
    },
    {
        platform: 'PS2',
        globalsale: 967.66,
        year: 2005,
        id: 'PS2-2005'
    },
    {
        platform: 'X360',
        globalsale: 955.73,
        year: 2014,
        id: 'X360-2014'
    },
    {
        platform: 'PS3',
        globalsale: 949.35,
        year: 2016,
        id: 'PS3-2016'
    },
    {
        platform: 'PS3',
        globalsale: 949.35,
        year: 2017,
        id: 'PS3-2017'
    },
    {
        platform: 'PS3',
        globalsale: 949.35,
        year: 2018,
        id: 'PS3-2018'
    },
    {
        platform: 'PS3',
        globalsale: 949.35,
        year: 2019,
        id: 'PS3-2019'
    },
    {
        platform: 'PS3',
        globalsale: 949.35,
        year: 2020,
        id: 'PS3-2020'
    },
    {
        platform: 'PS3',
        globalsale: 946.76,
        year: 2015,
        id: 'PS3-2015'
    },
    {
        platform: 'PS3',
        globalsale: 928.54,
        year: 2014,
        id: 'PS3-2014'
    },
    {
        platform: 'X360',
        globalsale: 919.31,
        year: 2013,
        id: 'X360-2013'
    },
    {
        platform: 'Wii',
        globalsale: 909.81,
        year: 2015,
        id: 'Wii-2015'
    },
    {
        platform: 'Wii',
        globalsale: 909.81,
        year: 2016,
        id: 'Wii-2016'
    },
    {
        platform: 'Wii',
        globalsale: 909.81,
        year: 2017,
        id: 'Wii-2017'
    },
    {
        platform: 'Wii',
        globalsale: 909.81,
        year: 2018,
        id: 'Wii-2018'
    },
    {
        platform: 'Wii',
        globalsale: 909.81,
        year: 2019,
        id: 'Wii-2019'
    },
    {
        platform: 'Wii',
        globalsale: 909.81,
        year: 2020,
        id: 'Wii-2020'
    },
    {
        platform: 'Wii',
        globalsale: 908.26,
        year: 2014,
        id: 'Wii-2014'
    },
    {
        platform: 'Wii',
        globalsale: 903.82,
        year: 2013,
        id: 'Wii-2013'
    },
    {
        platform: 'Wii',
        globalsale: 894.46,
        year: 2012,
        id: 'Wii-2012'
    },
    {
        platform: 'PS3',
        globalsale: 877.58,
        year: 2013,
        id: 'PS3-2013'
    },
    {
        platform: 'Wii',
        globalsale: 871.69,
        year: 2011,
        id: 'Wii-2011'
    },
    {
        platform: 'X360',
        globalsale: 829.7,
        year: 2012,
        id: 'X360-2012'
    },
    {
        platform: 'DS',
        globalsale: 818.96,
        year: 2020,
        id: 'DS-2020'
    },
    {
        platform: 'DS',
        globalsale: 818.67,
        year: 2014,
        id: 'DS-2014'
    },
    {
        platform: 'DS',
        globalsale: 818.67,
        year: 2015,
        id: 'DS-2015'
    },
    {
        platform: 'DS',
        globalsale: 818.67,
        year: 2016,
        id: 'DS-2016'
    },
    {
        platform: 'DS',
        globalsale: 818.67,
        year: 2017,
        id: 'DS-2017'
    },
    {
        platform: 'DS',
        globalsale: 818.67,
        year: 2018,
        id: 'DS-2018'
    },
    {
        platform: 'DS',
        globalsale: 818.67,
        year: 2019,
        id: 'DS-2019'
    },
    {
        platform: 'DS',
        globalsale: 818.65,
        year: 2013,
        id: 'DS-2013'
    },
    {
        platform: 'DS',
        globalsale: 816.69,
        year: 2012,
        id: 'DS-2012'
    },
    {
        platform: 'Wii',
        globalsale: 809.28,
        year: 2010,
        id: 'Wii-2010'
    },
    {
        platform: 'PS2',
        globalsale: 807.01,
        year: 2004,
        id: 'PS2-2004'
    },
    {
        platform: 'DS',
        globalsale: 805.05,
        year: 2011,
        id: 'DS-2011'
    },
    {
        platform: 'DS',
        globalsale: 777.25,
        year: 2010,
        id: 'DS-2010'
    },
    {
        platform: 'PS3',
        globalsale: 760.19,
        year: 2012,
        id: 'PS3-2012'
    },
    {
        platform: 'X360',
        globalsale: 728.82,
        year: 2011,
        id: 'X360-2011'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2003,
        id: 'PS-2003'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2004,
        id: 'PS-2004'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2005,
        id: 'PS-2005'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2006,
        id: 'PS-2006'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2007,
        id: 'PS-2007'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2008,
        id: 'PS-2008'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2009,
        id: 'PS-2009'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2010,
        id: 'PS-2010'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2011,
        id: 'PS-2011'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2012,
        id: 'PS-2012'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2013,
        id: 'PS-2013'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2014,
        id: 'PS-2014'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2015,
        id: 'PS-2015'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2016,
        id: 'PS-2016'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2017,
        id: 'PS-2017'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2018,
        id: 'PS-2018'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2019,
        id: 'PS-2019'
    },
    {
        platform: 'PS',
        globalsale: 727.39,
        year: 2020,
        id: 'PS-2020'
    },
    {
        platform: 'PS',
        globalsale: 725.34,
        year: 2002,
        id: 'PS-2002'
    },
    {
        platform: 'PS',
        globalsale: 718.65,
        year: 2001,
        id: 'PS-2001'
    },
    {
        platform: 'DS',
        globalsale: 689.27,
        year: 2009,
        id: 'DS-2009'
    },
    {
        platform: 'PS',
        globalsale: 683.13,
        year: 2000,
        id: 'PS-2000'
    },
    {
        platform: 'Wii',
        globalsale: 677.48,
        year: 2009,
        id: 'Wii-2009'
    },
    {
        platform: 'PS3',
        globalsale: 650.7,
        year: 2011,
        id: 'PS3-2011'
    },
    {
        platform: 'PS2',
        globalsale: 595.23,
        year: 2003,
        id: 'PS2-2003'
    },
    {
        platform: 'PS',
        globalsale: 586.85,
        year: 1999,
        id: 'PS-1999'
    },
    {
        platform: 'X360',
        globalsale: 583.7,
        year: 2010,
        id: 'X360-2010'
    },
    {
        platform: 'DS',
        globalsale: 567.28,
        year: 2008,
        id: 'DS-2008'
    },
    {
        platform: 'PS3',
        globalsale: 491.33,
        year: 2010,
        id: 'PS3-2010'
    },
    {
        platform: 'Wii',
        globalsale: 467.04,
        year: 2008,
        id: 'Wii-2008'
    },
    {
        platform: 'PS',
        globalsale: 442.28,
        year: 1998,
        id: 'PS-1998'
    },
    {
        platform: 'DS',
        globalsale: 419.39,
        year: 2007,
        id: 'DS-2007'
    },
    {
        platform: 'X360',
        globalsale: 412.65,
        year: 2009,
        id: 'X360-2009'
    },
    {
        platform: 'PS2',
        globalsale: 410.94,
        year: 2002,
        id: 'PS2-2002'
    },
    {
        platform: 'PS3',
        globalsale: 346.91,
        year: 2009,
        id: 'PS3-2009'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2007,
        id: 'GBA-2007'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2008,
        id: 'GBA-2008'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2009,
        id: 'GBA-2009'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2010,
        id: 'GBA-2010'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2011,
        id: 'GBA-2011'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2012,
        id: 'GBA-2012'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2013,
        id: 'GBA-2013'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2014,
        id: 'GBA-2014'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2015,
        id: 'GBA-2015'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2016,
        id: 'GBA-2016'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2017,
        id: 'GBA-2017'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2018,
        id: 'GBA-2018'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2019,
        id: 'GBA-2019'
    },
    {
        platform: 'GBA',
        globalsale: 313.56,
        year: 2020,
        id: 'GBA-2020'
    },
    {
        platform: 'GBA',
        globalsale: 310.13,
        year: 2006,
        id: 'GBA-2006'
    },
    {
        platform: 'GBA',
        globalsale: 304.78,
        year: 2005,
        id: 'GBA-2005'
    },
    {
        platform: 'Wii',
        globalsale: 292.88,
        year: 2007,
        id: 'Wii-2007'
    },
    {
        platform: 'X360',
        globalsale: 291.8,
        year: 2008,
        id: 'X360-2008'
    },
    {
        platform: 'PSP',
        globalsale: 291.71,
        year: 2015,
        id: 'PSP-2015'
    },
    {
        platform: 'PSP',
        globalsale: 291.71,
        year: 2016,
        id: 'PSP-2016'
    },
    {
        platform: 'PSP',
        globalsale: 291.71,
        year: 2017,
        id: 'PSP-2017'
    },
    {
        platform: 'PSP',
        globalsale: 291.71,
        year: 2018,
        id: 'PSP-2018'
    },
    {
        platform: 'PSP',
        globalsale: 291.71,
        year: 2019,
        id: 'PSP-2019'
    },
    {
        platform: 'PSP',
        globalsale: 291.71,
        year: 2020,
        id: 'PSP-2020'
    },
    {
        platform: 'PSP',
        globalsale: 291.59,
        year: 2014,
        id: 'PSP-2014'
    },
    {
        platform: 'PSP',
        globalsale: 291.35,
        year: 2013,
        id: 'PSP-2013'
    },
    {
        platform: 'PSP',
        globalsale: 288.16,
        year: 2012,
        id: 'PSP-2012'
    },
    {
        platform: 'PSP',
        globalsale: 280.44,
        year: 2011,
        id: 'PSP-2011'
    },
    {
        platform: 'PS4',
        globalsale: 278.1,
        year: 2017,
        id: 'PS4-2017'
    },
    {
        platform: 'PS4',
        globalsale: 278.1,
        year: 2018,
        id: 'PS4-2018'
    },
    {
        platform: 'PS4',
        globalsale: 278.1,
        year: 2019,
        id: 'PS4-2019'
    },
    {
        platform: 'PS4',
        globalsale: 278.1,
        year: 2020,
        id: 'PS4-2020'
    },
    {
        platform: 'PS4',
        globalsale: 278.07,
        year: 2016,
        id: 'PS4-2016'
    },
    {
        platform: 'PS',
        globalsale: 272.7,
        year: 1997,
        id: 'PS-1997'
    },
    {
        platform: 'GBA',
        globalsale: 270.88,
        year: 2004,
        id: 'GBA-2004'
    },
    {
        platform: 'DS',
        globalsale: 270.03,
        year: 2006,
        id: 'DS-2006'
    },
    {
        platform: 'PSP',
        globalsale: 262.55,
        year: 2010,
        id: 'PSP-2010'
    },
    {
        platform: 'PC',
        globalsale: 255.05,
        year: 2016,
        id: 'PC-2016'
    },
    {
        platform: 'PC',
        globalsale: 255.05,
        year: 2017,
        id: 'PC-2017'
    },
    {
        platform: 'PC',
        globalsale: 255.05,
        year: 2018,
        id: 'PC-2018'
    },
    {
        platform: 'PC',
        globalsale: 255.05,
        year: 2019,
        id: 'PC-2019'
    },
    {
        platform: 'PC',
        globalsale: 255.05,
        year: 2020,
        id: 'PC-2020'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2001,
        id: 'GB-2001'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2002,
        id: 'GB-2002'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2003,
        id: 'GB-2003'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2004,
        id: 'GB-2004'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2005,
        id: 'GB-2005'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2006,
        id: 'GB-2006'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2007,
        id: 'GB-2007'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2008,
        id: 'GB-2008'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2009,
        id: 'GB-2009'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2010,
        id: 'GB-2010'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2011,
        id: 'GB-2011'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2012,
        id: 'GB-2012'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2013,
        id: 'GB-2013'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2014,
        id: 'GB-2014'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2015,
        id: 'GB-2015'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2016,
        id: 'GB-2016'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2017,
        id: 'GB-2017'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2018,
        id: 'GB-2018'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2019,
        id: 'GB-2019'
    },
    {
        platform: 'GB',
        globalsale: 254.42,
        year: 2020,
        id: 'GB-2020'
    },
    {
        platform: 'PC',
        globalsale: 252.45,
        year: 2015,
        id: 'PC-2015'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2008,
        id: 'XB-2008'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2009,
        id: 'XB-2009'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2010,
        id: 'XB-2010'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2011,
        id: 'XB-2011'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2012,
        id: 'XB-2012'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2013,
        id: 'XB-2013'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2014,
        id: 'XB-2014'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2015,
        id: 'XB-2015'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2016,
        id: 'XB-2016'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2017,
        id: 'XB-2017'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2018,
        id: 'XB-2018'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2019,
        id: 'XB-2019'
    },
    {
        platform: 'XB',
        globalsale: 252.09,
        year: 2020,
        id: 'XB-2020'
    },
    {
        platform: 'XB',
        globalsale: 251.91,
        year: 2007,
        id: 'XB-2007'
    },
    {
        platform: 'XB',
        globalsale: 251.36,
        year: 2006,
        id: 'XB-2006'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 1994,
        id: 'NES-1994'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 1995,
        id: 'NES-1995'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 1996,
        id: 'NES-1996'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 1997,
        id: 'NES-1997'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 1998,
        id: 'NES-1998'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 1999,
        id: 'NES-1999'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2000,
        id: 'NES-2000'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2001,
        id: 'NES-2001'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2002,
        id: 'NES-2002'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2003,
        id: 'NES-2003'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2004,
        id: 'NES-2004'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2005,
        id: 'NES-2005'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2006,
        id: 'NES-2006'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2007,
        id: 'NES-2007'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2008,
        id: 'NES-2008'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2009,
        id: 'NES-2009'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2010,
        id: 'NES-2010'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2011,
        id: 'NES-2011'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2012,
        id: 'NES-2012'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2013,
        id: 'NES-2013'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2014,
        id: 'NES-2014'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2015,
        id: 'NES-2015'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2016,
        id: 'NES-2016'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2017,
        id: 'NES-2017'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2018,
        id: 'NES-2018'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2019,
        id: 'NES-2019'
    },
    {
        platform: 'NES',
        globalsale: 251.07,
        year: 2020,
        id: 'NES-2020'
    },
    {
        platform: 'NES',
        globalsale: 250.96,
        year: 1993,
        id: 'NES-1993'
    },
    {
        platform: 'NES',
        globalsale: 247.35,
        year: 1992,
        id: 'NES-1992'
    },
    {
        platform: '3DS',
        globalsale: 246.28,
        year: 2016,
        id: '3DS-2016'
    },
    {
        platform: '3DS',
        globalsale: 246.28,
        year: 2017,
        id: '3DS-2017'
    },
    {
        platform: '3DS',
        globalsale: 246.28,
        year: 2018,
        id: '3DS-2018'
    },
    {
        platform: '3DS',
        globalsale: 246.28,
        year: 2019,
        id: '3DS-2019'
    },
    {
        platform: '3DS',
        globalsale: 246.28,
        year: 2020,
        id: '3DS-2020'
    },
    {
        platform: 'NES',
        globalsale: 245.37,
        year: 1991,
        id: 'NES-1991'
    },
    {
        platform: 'GB',
        globalsale: 245.18,
        year: 2000,
        id: 'GB-2000'
    },
    {
        platform: 'PC',
        globalsale: 244.38,
        year: 2014,
        id: 'PC-2014'
    },
    {
        platform: 'XB',
        globalsale: 241.21,
        year: 2005,
        id: 'XB-2005'
    },
    {
        platform: '3DS',
        globalsale: 239.68,
        year: 2015,
        id: '3DS-2015'
    },
    {
        platform: 'NES',
        globalsale: 239.26,
        year: 1990,
        id: 'NES-1990'
    },
    {
        platform: 'PS4',
        globalsale: 238.82,
        year: 2015,
        id: 'PS4-2015'
    },
    {
        platform: 'PC',
        globalsale: 230.99,
        year: 2013,
        id: 'PC-2013'
    },
    {
        platform: 'PSP',
        globalsale: 227.44,
        year: 2009,
        id: 'PSP-2009'
    },
    {
        platform: 'GB',
        globalsale: 225.42,
        year: 1999,
        id: 'GB-1999'
    },
    {
        platform: 'NES',
        globalsale: 223.52,
        year: 1989,
        id: 'NES-1989'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2002,
        id: 'N64-2002'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2003,
        id: 'N64-2003'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2004,
        id: 'N64-2004'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2005,
        id: 'N64-2005'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2006,
        id: 'N64-2006'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2007,
        id: 'N64-2007'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2008,
        id: 'N64-2008'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2009,
        id: 'N64-2009'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2010,
        id: 'N64-2010'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2011,
        id: 'N64-2011'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2012,
        id: 'N64-2012'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2013,
        id: 'N64-2013'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2014,
        id: 'N64-2014'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2015,
        id: 'N64-2015'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2016,
        id: 'N64-2016'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2017,
        id: 'N64-2017'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2018,
        id: 'N64-2018'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2019,
        id: 'N64-2019'
    },
    {
        platform: 'N64',
        globalsale: 218.21,
        year: 2020,
        id: 'N64-2020'
    },
    {
        platform: 'PC',
        globalsale: 218.16,
        year: 2012,
        id: 'PC-2012'
    },
    {
        platform: 'N64',
        globalsale: 218.13,
        year: 2001,
        id: 'N64-2001'
    },
    {
        platform: 'NES',
        globalsale: 215.67,
        year: 1988,
        id: 'NES-1988'
    },
    {
        platform: 'N64',
        globalsale: 214.87,
        year: 2000,
        id: 'N64-2000'
    },
    {
        platform: 'PS3',
        globalsale: 214.57,
        year: 2008,
        id: 'PS3-2008'
    },
    {
        platform: '3DS',
        globalsale: 212.69,
        year: 2014,
        id: '3DS-2014'
    },
    {
        platform: 'PS2',
        globalsale: 205.54,
        year: 2001,
        id: 'PS2-2001'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 1999,
        id: 'SNES-1999'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2000,
        id: 'SNES-2000'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2001,
        id: 'SNES-2001'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2002,
        id: 'SNES-2002'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2003,
        id: 'SNES-2003'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2004,
        id: 'SNES-2004'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2005,
        id: 'SNES-2005'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2006,
        id: 'SNES-2006'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2007,
        id: 'SNES-2007'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2008,
        id: 'SNES-2008'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2009,
        id: 'SNES-2009'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2010,
        id: 'SNES-2010'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2011,
        id: 'SNES-2011'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2012,
        id: 'SNES-2012'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2013,
        id: 'SNES-2013'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2014,
        id: 'SNES-2014'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2015,
        id: 'SNES-2015'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2016,
        id: 'SNES-2016'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2017,
        id: 'SNES-2017'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2018,
        id: 'SNES-2018'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2019,
        id: 'SNES-2019'
    },
    {
        platform: 'SNES',
        globalsale: 200.05,
        year: 2020,
        id: 'SNES-2020'
    },
    {
        platform: 'SNES',
        globalsale: 199.79,
        year: 1998,
        id: 'SNES-1998'
    },
    {
        platform: 'SNES',
        globalsale: 199.57,
        year: 1997,
        id: 'SNES-1997'
    },
    {
        platform: 'SNES',
        globalsale: 198.58,
        year: 1996,
        id: 'SNES-1996'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2007,
        id: 'GC-2007'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2008,
        id: 'GC-2008'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2009,
        id: 'GC-2009'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2010,
        id: 'GC-2010'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2011,
        id: 'GC-2011'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2012,
        id: 'GC-2012'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2013,
        id: 'GC-2013'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2014,
        id: 'GC-2014'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2015,
        id: 'GC-2015'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2016,
        id: 'GC-2016'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2017,
        id: 'GC-2017'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2018,
        id: 'GC-2018'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2019,
        id: 'GC-2019'
    },
    {
        platform: 'GC',
        globalsale: 197.14,
        year: 2020,
        id: 'GC-2020'
    },
    {
        platform: 'GC',
        globalsale: 196.87,
        year: 2006,
        id: 'GC-2006'
    },
    {
        platform: 'PC',
        globalsale: 194.63,
        year: 2011,
        id: 'PC-2011'
    },
    {
        platform: 'GBA',
        globalsale: 192.79,
        year: 2003,
        id: 'GBA-2003'
    },
    {
        platform: 'XB',
        globalsale: 192.04,
        year: 2004,
        id: 'XB-2004'
    },
    {
        platform: 'PSP',
        globalsale: 189.37,
        year: 2008,
        id: 'PSP-2008'
    },
    {
        platform: 'GB',
        globalsale: 187.41,
        year: 1998,
        id: 'GB-1998'
    },
    {
        platform: 'GC',
        globalsale: 185.58,
        year: 2005,
        id: 'GC-2005'
    },
    {
        platform: 'SNES',
        globalsale: 182.65,
        year: 1995,
        id: 'SNES-1995'
    },
    {
        platform: 'N64',
        globalsale: 180.86,
        year: 1999,
        id: 'N64-1999'
    },
    {
        platform: 'NES',
        globalsale: 170.66,
        year: 1987,
        id: 'NES-1987'
    },
    {
        platform: '3DS',
        globalsale: 169.55,
        year: 2013,
        id: '3DS-2013'
    },
    {
        platform: 'GB',
        globalsale: 160.51,
        year: 1997,
        id: 'GB-1997'
    },
    {
        platform: 'PC',
        globalsale: 159.38,
        year: 2010,
        id: 'PC-2010'
    },
    {
        platform: 'GC',
        globalsale: 157.78,
        year: 2004,
        id: 'GC-2004'
    },
    {
        platform: 'X360',
        globalsale: 156.04,
        year: 2007,
        id: 'X360-2007'
    },
    {
        platform: 'PSP',
        globalsale: 154.69,
        year: 2007,
        id: 'PSP-2007'
    },
    {
        platform: 'GB',
        globalsale: 154.14,
        year: 1996,
        id: 'GB-1996'
    },
    {
        platform: 'NES',
        globalsale: 150.9,
        year: 1986,
        id: 'NES-1986'
    },
    {
        platform: 'SNES',
        globalsale: 150.44,
        year: 1994,
        id: 'SNES-1994'
    },
    {
        platform: 'DS',
        globalsale: 148.88,
        year: 2005,
        id: 'DS-2005'
    },
    {
        platform: 'XOne',
        globalsale: 141.06,
        year: 2016,
        id: 'XOne-2016'
    },
    {
        platform: 'XOne',
        globalsale: 141.06,
        year: 2017,
        id: 'XOne-2017'
    },
    {
        platform: 'XOne',
        globalsale: 141.06,
        year: 2018,
        id: 'XOne-2018'
    },
    {
        platform: 'XOne',
        globalsale: 141.06,
        year: 2019,
        id: 'XOne-2019'
    },
    {
        platform: 'XOne',
        globalsale: 141.06,
        year: 2020,
        id: 'XOne-2020'
    },
    {
        platform: 'Wii',
        globalsale: 137.91,
        year: 2006,
        id: 'Wii-2006'
    },
    {
        platform: 'PS',
        globalsale: 136.62,
        year: 1996,
        id: 'PS-1996'
    },
    {
        platform: 'GBA',
        globalsale: 136.06,
        year: 2002,
        id: 'GBA-2002'
    },
    {
        platform: 'PC',
        globalsale: 134.92,
        year: 2009,
        id: 'PC-2009'
    },
    {
        platform: 'GC',
        globalsale: 128.89,
        year: 2003,
        id: 'GC-2003'
    },
    {
        platform: 'XOne',
        globalsale: 128.69,
        year: 2015,
        id: 'XOne-2015'
    },
    {
        platform: 'XB',
        globalsale: 126.54,
        year: 2003,
        id: 'XB-2003'
    },
    {
        platform: 'PS4',
        globalsale: 123.52,
        year: 2014,
        id: 'PS4-2014'
    },
    {
        platform: 'N64',
        globalsale: 122.9,
        year: 1998,
        id: 'N64-1998'
    },
    {
        platform: 'GB',
        globalsale: 118.12,
        year: 1995,
        id: 'GB-1995'
    },
    {
        platform: 'PC',
        globalsale: 117.76,
        year: 2008,
        id: 'PC-2008'
    },
    {
        platform: 'SNES',
        globalsale: 115.36,
        year: 1993,
        id: 'SNES-1993'
    },
    {
        platform: 'GB',
        globalsale: 114.52,
        year: 1994,
        id: 'GB-1994'
    },
    {
        platform: 'NES',
        globalsale: 114.49,
        year: 1985,
        id: 'NES-1985'
    },
    {
        platform: '3DS',
        globalsale: 113.67,
        year: 2012,
        id: '3DS-2012'
    },
    {
        platform: 'PSP',
        globalsale: 107.21,
        year: 2006,
        id: 'PSP-2006'
    },
    {
        platform: 'PC',
        globalsale: 105.09,
        year: 2007,
        id: 'PC-2007'
    },
    {
        platform: 'GB',
        globalsale: 102.35,
        year: 1992,
        id: 'GB-1992'
    },
    {
        platform: 'GB',
        globalsale: 102.35,
        year: 1993,
        id: 'GB-1993'
    },
    {
        platform: 'PC',
        globalsale: 95.69,
        year: 2006,
        id: 'PC-2006'
    },
    {
        platform: 'PS3',
        globalsale: 94.88,
        year: 2007,
        id: 'PS3-2007'
    },
    {
        platform: 'PC',
        globalsale: 92.72,
        year: 2005,
        id: 'PC-2005'
    },
    {
        platform: 'PC',
        globalsale: 88.25,
        year: 2004,
        id: 'PC-2004'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1989,
        id: '2600-1989'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1990,
        id: '2600-1990'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1991,
        id: '2600-1991'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1992,
        id: '2600-1992'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1993,
        id: '2600-1993'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1994,
        id: '2600-1994'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1995,
        id: '2600-1995'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1996,
        id: '2600-1996'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1997,
        id: '2600-1997'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1998,
        id: '2600-1998'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 1999,
        id: '2600-1999'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2000,
        id: '2600-2000'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2001,
        id: '2600-2001'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2002,
        id: '2600-2002'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2003,
        id: '2600-2003'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2004,
        id: '2600-2004'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2005,
        id: '2600-2005'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2006,
        id: '2600-2006'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2007,
        id: '2600-2007'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2008,
        id: '2600-2008'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2009,
        id: '2600-2009'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2010,
        id: '2600-2010'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2011,
        id: '2600-2011'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2012,
        id: '2600-2012'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2013,
        id: '2600-2013'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2014,
        id: '2600-2014'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2015,
        id: '2600-2015'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2016,
        id: '2600-2016'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2017,
        id: '2600-2017'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2018,
        id: '2600-2018'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2019,
        id: '2600-2019'
    },
    {
        platform: '2600',
        globalsale: 86.57,
        year: 2020,
        id: '2600-2020'
    },
    {
        platform: '2600',
        globalsale: 85.95,
        year: 1988,
        id: '2600-1988'
    },
    {
        platform: '2600',
        globalsale: 85.2,
        year: 1987,
        id: '2600-1987'
    },
    {
        platform: '2600',
        globalsale: 83.22,
        year: 1986,
        id: '2600-1986'
    },
    {
        platform: '2600',
        globalsale: 82.56,
        year: 1985,
        id: '2600-1985'
    },
    {
        platform: '2600',
        globalsale: 82.11,
        year: 1984,
        id: '2600-1984'
    },
    {
        platform: 'WiiU',
        globalsale: 81.86,
        year: 2016,
        id: 'WiiU-2016'
    },
    {
        platform: 'WiiU',
        globalsale: 81.86,
        year: 2017,
        id: 'WiiU-2017'
    },
    {
        platform: 'WiiU',
        globalsale: 81.86,
        year: 2018,
        id: 'WiiU-2018'
    },
    {
        platform: 'WiiU',
        globalsale: 81.86,
        year: 2019,
        id: 'WiiU-2019'
    },
    {
        platform: 'WiiU',
        globalsale: 81.86,
        year: 2020,
        id: 'WiiU-2020'
    },
    {
        platform: '2600',
        globalsale: 81.84,
        year: 1983,
        id: '2600-1983'
    },
    {
        platform: 'WiiU',
        globalsale: 78.57,
        year: 2015,
        id: 'WiiU-2015'
    },
    {
        platform: 'GC',
        globalsale: 78.23,
        year: 2002,
        id: 'GC-2002'
    },
    {
        platform: 'PC',
        globalsale: 77.79,
        year: 2003,
        id: 'PC-2003'
    },
    {
        platform: 'GB',
        globalsale: 76.87,
        year: 1991,
        id: 'GB-1991'
    },
    {
        platform: '2600',
        globalsale: 76.01,
        year: 1982,
        id: '2600-1982'
    },
    {
        platform: 'SNES',
        globalsale: 75.35,
        year: 1992,
        id: 'SNES-1992'
    },
    {
        platform: 'N64',
        globalsale: 73.62,
        year: 1997,
        id: 'N64-1997'
    },
    {
        platform: 'XB',
        globalsale: 71.38,
        year: 2002,
        id: 'XB-2002'
    },
    {
        platform: 'GB',
        globalsale: 71.3,
        year: 1990,
        id: 'GB-1990'
    },
    {
        platform: 'XOne',
        globalsale: 71.03,
        year: 2014,
        id: 'XOne-2014'
    },
    {
        platform: 'PC',
        globalsale: 68.83,
        year: 2002,
        id: 'PC-2002'
    },
    {
        platform: 'GB',
        globalsale: 66.41,
        year: 1989,
        id: 'GB-1989'
    },
    {
        platform: '3DS',
        globalsale: 62.53,
        year: 2011,
        id: '3DS-2011'
    },
    {
        platform: 'WiiU',
        globalsale: 62.19,
        year: 2014,
        id: 'WiiU-2014'
    },
    {
        platform: 'GBA',
        globalsale: 61.68,
        year: 2001,
        id: 'GBA-2001'
    },
    {
        platform: 'PSV',
        globalsale: 61.63,
        year: 2017,
        id: 'PSV-2017'
    },
    {
        platform: 'PSV',
        globalsale: 61.63,
        year: 2018,
        id: 'PSV-2018'
    },
    {
        platform: 'PSV',
        globalsale: 61.63,
        year: 2019,
        id: 'PSV-2019'
    },
    {
        platform: 'PSV',
        globalsale: 61.63,
        year: 2020,
        id: 'PSV-2020'
    },
    {
        platform: 'PSV',
        globalsale: 61.61,
        year: 2016,
        id: 'PSV-2016'
    },
    {
        platform: 'NES',
        globalsale: 61.05,
        year: 1984,
        id: 'NES-1984'
    },
    {
        platform: 'PC',
        globalsale: 60.23,
        year: 2001,
        id: 'PC-2001'
    },
    {
        platform: 'X360',
        globalsale: 60.2,
        year: 2006,
        id: 'X360-2006'
    },
    {
        platform: 'PSV',
        globalsale: 58.21,
        year: 2015,
        id: 'PSV-2015'
    },
    {
        platform: 'PC',
        globalsale: 54.72,
        year: 2000,
        id: 'PC-2000'
    },
    {
        platform: 'PSP',
        globalsale: 51.36,
        year: 2005,
        id: 'PSP-2005'
    },
    {
        platform: 'PSV',
        globalsale: 51.11,
        year: 2014,
        id: 'PSV-2014'
    },
    {
        platform: 'PC',
        globalsale: 50.04,
        year: 1999,
        id: 'PC-1999'
    },
    {
        platform: '2600',
        globalsale: 47.15,
        year: 1981,
        id: '2600-1981'
    },
    {
        platform: 'PC',
        globalsale: 45.29,
        year: 1998,
        id: 'PC-1998'
    },
    {
        platform: 'SNES',
        globalsale: 42.37,
        year: 1991,
        id: 'SNES-1991'
    },
    {
        platform: 'PC',
        globalsale: 42.01,
        year: 1997,
        id: 'PC-1997'
    },
    {
        platform: 'PS',
        globalsale: 41.94,
        year: 1995,
        id: 'PS-1995'
    },
    {
        platform: 'WiiU',
        globalsale: 39.68,
        year: 2013,
        id: 'WiiU-2013'
    },
    {
        platform: 'PS2',
        globalsale: 39.11,
        year: 2000,
        id: 'PS2-2000'
    },
    {
        platform: 'PSV',
        globalsale: 36.37,
        year: 2013,
        id: 'PSV-2013'
    },
    {
        platform: 'N64',
        globalsale: 34.11,
        year: 1996,
        id: 'N64-1996'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 1999,
        id: 'SAT-1999'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2000,
        id: 'SAT-2000'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2001,
        id: 'SAT-2001'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2002,
        id: 'SAT-2002'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2003,
        id: 'SAT-2003'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2004,
        id: 'SAT-2004'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2005,
        id: 'SAT-2005'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2006,
        id: 'SAT-2006'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2007,
        id: 'SAT-2007'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2008,
        id: 'SAT-2008'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2009,
        id: 'SAT-2009'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2010,
        id: 'SAT-2010'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2011,
        id: 'SAT-2011'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2012,
        id: 'SAT-2012'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2013,
        id: 'SAT-2013'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2014,
        id: 'SAT-2014'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2015,
        id: 'SAT-2015'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2016,
        id: 'SAT-2016'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2017,
        id: 'SAT-2017'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2018,
        id: 'SAT-2018'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2019,
        id: 'SAT-2019'
    },
    {
        platform: 'SAT',
        globalsale: 33.59,
        year: 2020,
        id: 'SAT-2020'
    },
    {
        platform: 'SAT',
        globalsale: 33.5,
        year: 1998,
        id: 'SAT-1998'
    },
    {
        platform: 'PC',
        globalsale: 30.75,
        year: 1996,
        id: 'PC-1996'
    },
    {
        platform: 'SAT',
        globalsale: 29.68,
        year: 1997,
        id: 'SAT-1997'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 1994,
        id: 'GEN-1994'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 1995,
        id: 'GEN-1995'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 1996,
        id: 'GEN-1996'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 1997,
        id: 'GEN-1997'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 1998,
        id: 'GEN-1998'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 1999,
        id: 'GEN-1999'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2000,
        id: 'GEN-2000'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2001,
        id: 'GEN-2001'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2002,
        id: 'GEN-2002'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2003,
        id: 'GEN-2003'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2004,
        id: 'GEN-2004'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2005,
        id: 'GEN-2005'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2006,
        id: 'GEN-2006'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2007,
        id: 'GEN-2007'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2008,
        id: 'GEN-2008'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2009,
        id: 'GEN-2009'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2010,
        id: 'GEN-2010'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2011,
        id: 'GEN-2011'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2012,
        id: 'GEN-2012'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2013,
        id: 'GEN-2013'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2014,
        id: 'GEN-2014'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2015,
        id: 'GEN-2015'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2016,
        id: 'GEN-2016'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2017,
        id: 'GEN-2017'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2018,
        id: 'GEN-2018'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2019,
        id: 'GEN-2019'
    },
    {
        platform: 'GEN',
        globalsale: 28.36,
        year: 2020,
        id: 'GEN-2020'
    },
    {
        platform: 'GC',
        globalsale: 26.3,
        year: 2001,
        id: 'GC-2001'
    },
    {
        platform: 'SNES',
        globalsale: 26.16,
        year: 1990,
        id: 'SNES-1990'
    },
    {
        platform: 'PS4',
        globalsale: 24.76,
        year: 2013,
        id: 'PS4-2013'
    },
    {
        platform: 'PSV',
        globalsale: 23.68,
        year: 2012,
        id: 'PSV-2012'
    },
    {
        platform: 'XB',
        globalsale: 23.23,
        year: 2001,
        id: 'XB-2001'
    },
    {
        platform: 'SAT',
        globalsale: 22.91,
        year: 1996,
        id: 'SAT-1996'
    },
    {
        platform: 'PS3',
        globalsale: 21.07,
        year: 2006,
        id: 'PS3-2006'
    },
    {
        platform: 'GEN',
        globalsale: 20.25,
        year: 1993,
        id: 'GEN-1993'
    },
    {
        platform: 'PC',
        globalsale: 20.16,
        year: 1995,
        id: 'PC-1995'
    },
    {
        platform: 'GEN',
        globalsale: 19.6,
        year: 1992,
        id: 'GEN-1992'
    },
    {
        platform: 'XOne',
        globalsale: 18.6,
        year: 2013,
        id: 'XOne-2013'
    },
    {
        platform: 'WiiU',
        globalsale: 17.84,
        year: 2012,
        id: 'WiiU-2012'
    },
    {
        platform: 'DS',
        globalsale: 17.48,
        year: 2004,
        id: 'DS-2004'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2008,
        id: 'DC-2008'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2009,
        id: 'DC-2009'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2010,
        id: 'DC-2010'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2011,
        id: 'DC-2011'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2012,
        id: 'DC-2012'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2013,
        id: 'DC-2013'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2014,
        id: 'DC-2014'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2015,
        id: 'DC-2015'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2016,
        id: 'DC-2016'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2017,
        id: 'DC-2017'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2018,
        id: 'DC-2018'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2019,
        id: 'DC-2019'
    },
    {
        platform: 'DC',
        globalsale: 15.97,
        year: 2020,
        id: 'DC-2020'
    },
    {
        platform: 'PC',
        globalsale: 15.93,
        year: 1994,
        id: 'PC-1994'
    },
    {
        platform: 'DC',
        globalsale: 15.93,
        year: 2007,
        id: 'DC-2007'
    },
    {
        platform: 'DC',
        globalsale: 15.91,
        year: 2002,
        id: 'DC-2002'
    },
    {
        platform: 'DC',
        globalsale: 15.91,
        year: 2003,
        id: 'DC-2003'
    },
    {
        platform: 'DC',
        globalsale: 15.91,
        year: 2004,
        id: 'DC-2004'
    },
    {
        platform: 'DC',
        globalsale: 15.91,
        year: 2005,
        id: 'DC-2005'
    },
    {
        platform: 'DC',
        globalsale: 15.91,
        year: 2006,
        id: 'DC-2006'
    },
    {
        platform: 'DC',
        globalsale: 15.62,
        year: 2001,
        id: 'DC-2001'
    },
    {
        platform: 'SAT',
        globalsale: 15.22,
        year: 1995,
        id: 'SAT-1995'
    },
    {
        platform: 'DC',
        globalsale: 14.55,
        year: 2000,
        id: 'DC-2000'
    },
    {
        platform: '2600',
        globalsale: 11.38,
        year: 1980,
        id: '2600-1980'
    },
    {
        platform: 'NES',
        globalsale: 10.96,
        year: 1983,
        id: 'NES-1983'
    },
    {
        platform: 'DC',
        globalsale: 8.56,
        year: 1999,
        id: 'DC-1999'
    },
    {
        platform: 'X360',
        globalsale: 8.32,
        year: 2005,
        id: 'X360-2005'
    },
    {
        platform: 'PSP',
        globalsale: 7.13,
        year: 2004,
        id: 'PSP-2004'
    },
    {
        platform: 'GEN',
        globalsale: 6.94,
        year: 1991,
        id: 'GEN-1991'
    },
    {
        platform: 'PS',
        globalsale: 6.02,
        year: 1994,
        id: 'PS-1994'
    },
    {
        platform: 'PSV',
        globalsale: 5.15,
        year: 2011,
        id: 'PSV-2011'
    },
    {
        platform: 'SAT',
        globalsale: 3.64,
        year: 1994,
        id: 'SAT-1994'
    },
    {
        platform: 'DC',
        globalsale: 3.39,
        year: 1998,
        id: 'DC-1998'
    },
    {
        platform: 'PC',
        globalsale: 3.08,
        year: 1992,
        id: 'PC-1992'
    },
    {
        platform: 'PC',
        globalsale: 3.08,
        year: 1993,
        id: 'PC-1993'
    },
    {
        platform: 'GEN',
        globalsale: 2.6,
        year: 1990,
        id: 'GEN-1990'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 1994,
        id: 'SCD-1994'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 1995,
        id: 'SCD-1995'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 1996,
        id: 'SCD-1996'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 1997,
        id: 'SCD-1997'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 1998,
        id: 'SCD-1998'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 1999,
        id: 'SCD-1999'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2000,
        id: 'SCD-2000'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2001,
        id: 'SCD-2001'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2002,
        id: 'SCD-2002'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2003,
        id: 'SCD-2003'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2004,
        id: 'SCD-2004'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2005,
        id: 'SCD-2005'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2006,
        id: 'SCD-2006'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2007,
        id: 'SCD-2007'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2008,
        id: 'SCD-2008'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2009,
        id: 'SCD-2009'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2010,
        id: 'SCD-2010'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2011,
        id: 'SCD-2011'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2012,
        id: 'SCD-2012'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2013,
        id: 'SCD-2013'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2014,
        id: 'SCD-2014'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2015,
        id: 'SCD-2015'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2016,
        id: 'SCD-2016'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2017,
        id: 'SCD-2017'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2018,
        id: 'SCD-2018'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2019,
        id: 'SCD-2019'
    },
    {
        platform: 'SCD',
        globalsale: 1.87,
        year: 2020,
        id: 'SCD-2020'
    },
    {
        platform: 'SCD',
        globalsale: 1.5,
        year: 1993,
        id: 'SCD-1993'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 1996,
        id: 'NG-1996'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 1997,
        id: 'NG-1997'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 1998,
        id: 'NG-1998'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 1999,
        id: 'NG-1999'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2000,
        id: 'NG-2000'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2001,
        id: 'NG-2001'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2002,
        id: 'NG-2002'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2003,
        id: 'NG-2003'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2004,
        id: 'NG-2004'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2005,
        id: 'NG-2005'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2006,
        id: 'NG-2006'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2007,
        id: 'NG-2007'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2008,
        id: 'NG-2008'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2009,
        id: 'NG-2009'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2010,
        id: 'NG-2010'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2011,
        id: 'NG-2011'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2012,
        id: 'NG-2012'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2013,
        id: 'NG-2013'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2014,
        id: 'NG-2014'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2015,
        id: 'NG-2015'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2016,
        id: 'NG-2016'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2017,
        id: 'NG-2017'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2018,
        id: 'NG-2018'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2019,
        id: 'NG-2019'
    },
    {
        platform: 'NG',
        globalsale: 1.44,
        year: 2020,
        id: 'NG-2020'
    },
    {
        platform: 'GB',
        globalsale: 1.43,
        year: 1988,
        id: 'GB-1988'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2001,
        id: 'WS-2001'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2002,
        id: 'WS-2002'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2003,
        id: 'WS-2003'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2004,
        id: 'WS-2004'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2005,
        id: 'WS-2005'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2006,
        id: 'WS-2006'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2007,
        id: 'WS-2007'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2008,
        id: 'WS-2008'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2009,
        id: 'WS-2009'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2010,
        id: 'WS-2010'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2011,
        id: 'WS-2011'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2012,
        id: 'WS-2012'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2013,
        id: 'WS-2013'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2014,
        id: 'WS-2014'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2015,
        id: 'WS-2015'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2016,
        id: 'WS-2016'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2017,
        id: 'WS-2017'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2018,
        id: 'WS-2018'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2019,
        id: 'WS-2019'
    },
    {
        platform: 'WS',
        globalsale: 1.42,
        year: 2020,
        id: 'WS-2020'
    },
    {
        platform: 'NG',
        globalsale: 1.34,
        year: 1995,
        id: 'NG-1995'
    },
    {
        platform: 'WS',
        globalsale: 1.14,
        year: 2000,
        id: 'WS-2000'
    },
    {
        platform: 'NG',
        globalsale: 1.01,
        year: 1994,
        id: 'NG-1994'
    },
    {
        platform: 'XB',
        globalsale: 0.99,
        year: 2000,
        id: 'XB-2000'
    },
    {
        platform: 'WS',
        globalsale: 0.46,
        year: 1999,
        id: 'WS-1999'
    },
    {
        platform: 'NG',
        globalsale: 0.21,
        year: 1993,
        id: 'NG-1993'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 1995,
        id: 'TG16-1995'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 1996,
        id: 'TG16-1996'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 1997,
        id: 'TG16-1997'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 1998,
        id: 'TG16-1998'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 1999,
        id: 'TG16-1999'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2000,
        id: 'TG16-2000'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2001,
        id: 'TG16-2001'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2002,
        id: 'TG16-2002'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2003,
        id: 'TG16-2003'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2004,
        id: 'TG16-2004'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2005,
        id: 'TG16-2005'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2006,
        id: 'TG16-2006'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2007,
        id: 'TG16-2007'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2008,
        id: 'TG16-2008'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2009,
        id: 'TG16-2009'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2010,
        id: 'TG16-2010'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2011,
        id: 'TG16-2011'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2012,
        id: 'TG16-2012'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2013,
        id: 'TG16-2013'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2014,
        id: 'TG16-2014'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2015,
        id: 'TG16-2015'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2016,
        id: 'TG16-2016'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2017,
        id: 'TG16-2017'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2018,
        id: 'TG16-2018'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2019,
        id: 'TG16-2019'
    },
    {
        platform: 'TG16',
        globalsale: 0.16,
        year: 2020,
        id: 'TG16-2020'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 1995,
        id: '3DO-1995'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 1996,
        id: '3DO-1996'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 1997,
        id: '3DO-1997'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 1998,
        id: '3DO-1998'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 1999,
        id: '3DO-1999'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2000,
        id: '3DO-2000'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2001,
        id: '3DO-2001'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2002,
        id: '3DO-2002'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2003,
        id: '3DO-2003'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2004,
        id: '3DO-2004'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2005,
        id: '3DO-2005'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2006,
        id: '3DO-2006'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2007,
        id: '3DO-2007'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2008,
        id: '3DO-2008'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2009,
        id: '3DO-2009'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2010,
        id: '3DO-2010'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2011,
        id: '3DO-2011'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2012,
        id: '3DO-2012'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2013,
        id: '3DO-2013'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2014,
        id: '3DO-2014'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2015,
        id: '3DO-2015'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2016,
        id: '3DO-2016'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2017,
        id: '3DO-2017'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2018,
        id: '3DO-2018'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2019,
        id: '3DO-2019'
    },
    {
        platform: '3DO',
        globalsale: 0.1,
        year: 2020,
        id: '3DO-2020'
    },
    {
        platform: 'GBA',
        globalsale: 0.06,
        year: 2000,
        id: 'GBA-2000'
    },
    {
        platform: 'PC',
        globalsale: 0.06,
        year: 1988,
        id: 'PC-1988'
    },
    {
        platform: 'PC',
        globalsale: 0.06,
        year: 1989,
        id: 'PC-1989'
    },
    {
        platform: 'PC',
        globalsale: 0.06,
        year: 1990,
        id: 'PC-1990'
    },
    {
        platform: 'PC',
        globalsale: 0.06,
        year: 1991,
        id: 'PC-1991'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 1992,
        id: 'GG-1992'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 1993,
        id: 'GG-1993'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 1994,
        id: 'GG-1994'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 1995,
        id: 'GG-1995'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 1996,
        id: 'GG-1996'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 1997,
        id: 'GG-1997'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 1998,
        id: 'GG-1998'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 1999,
        id: 'GG-1999'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2000,
        id: 'GG-2000'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2001,
        id: 'GG-2001'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2002,
        id: 'GG-2002'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2003,
        id: 'GG-2003'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2004,
        id: 'GG-2004'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2005,
        id: 'GG-2005'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2006,
        id: 'GG-2006'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2007,
        id: 'GG-2007'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2008,
        id: 'GG-2008'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2009,
        id: 'GG-2009'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2010,
        id: 'GG-2010'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2011,
        id: 'GG-2011'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2012,
        id: 'GG-2012'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2013,
        id: 'GG-2013'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2014,
        id: 'GG-2014'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2015,
        id: 'GG-2015'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2016,
        id: 'GG-2016'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2017,
        id: 'GG-2017'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2018,
        id: 'GG-2018'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2019,
        id: 'GG-2019'
    },
    {
        platform: 'GG',
        globalsale: 0.04,
        year: 2020,
        id: 'GG-2020'
    },
    {
        platform: 'PC',
        globalsale: 0.03,
        year: 1985,
        id: 'PC-1985'
    },
    {
        platform: 'PC',
        globalsale: 0.03,
        year: 1986,
        id: 'PC-1986'
    },
    {
        platform: 'PC',
        globalsale: 0.03,
        year: 1987,
        id: 'PC-1987'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 1996,
        id: 'PCFX-1996'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 1997,
        id: 'PCFX-1997'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 1998,
        id: 'PCFX-1998'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 1999,
        id: 'PCFX-1999'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2000,
        id: 'PCFX-2000'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2001,
        id: 'PCFX-2001'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2002,
        id: 'PCFX-2002'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2003,
        id: 'PCFX-2003'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2004,
        id: 'PCFX-2004'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2005,
        id: 'PCFX-2005'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2006,
        id: 'PCFX-2006'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2007,
        id: 'PCFX-2007'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2008,
        id: 'PCFX-2008'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2009,
        id: 'PCFX-2009'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2010,
        id: 'PCFX-2010'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2011,
        id: 'PCFX-2011'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2012,
        id: 'PCFX-2012'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2013,
        id: 'PCFX-2013'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2014,
        id: 'PCFX-2014'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2015,
        id: 'PCFX-2015'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2016,
        id: 'PCFX-2016'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2017,
        id: 'PCFX-2017'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2018,
        id: 'PCFX-2018'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2019,
        id: 'PCFX-2019'
    },
    {
        platform: 'PCFX',
        globalsale: 0.03,
        year: 2020,
        id: 'PCFX-2020'
    },
    {
        platform: '3DO',
        globalsale: 0.02,
        year: 1994,
        id: '3DO-1994'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1985,
        id: 'DS-1985'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1986,
        id: 'DS-1986'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1987,
        id: 'DS-1987'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1988,
        id: 'DS-1988'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1989,
        id: 'DS-1989'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1990,
        id: 'DS-1990'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1991,
        id: 'DS-1991'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1992,
        id: 'DS-1992'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1993,
        id: 'DS-1993'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1994,
        id: 'DS-1994'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1995,
        id: 'DS-1995'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1996,
        id: 'DS-1996'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1997,
        id: 'DS-1997'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1998,
        id: 'DS-1998'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 1999,
        id: 'DS-1999'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 2000,
        id: 'DS-2000'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 2001,
        id: 'DS-2001'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 2002,
        id: 'DS-2002'
    },
    {
        platform: 'DS',
        globalsale: 0.02,
        year: 2003,
        id: 'DS-2003'
    }
];
const platforms = Array.from(new Set(data.map(e => e.platform)));
const years = Array.from(new Set(data.map(e => e.year)));
years.sort();

const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map(e => e.globalsale)))
    .range([0, innerWidth]);
const yScale = d3.scaleBand().domain(platforms).range([0, innerHeight]);
const colorScale = d3
    .scaleOrdinal()
    .domain(platforms)
    .range(d3.schemeSet2.concat(d3.schemeSet3));

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

const xAxisGroup = mainGroup
    .append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`);
const yAxisGroup = mainGroup.append('g').call(yAxis);
xAxisGroup
    .append('text')
    .text('Global Sale')
    .attr('text-anchor', 'middle')
    .attr('x', `${innerWidth / 2}`)
    .attr('y', 45)
    .attr('fill', 'black')
    .attr('font-size', '2em');
yAxisGroup
    .append('text')
    .text('Platform')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr('x', -innerHeight / 2)
    .attr('y', -60)
    .attr('fill', 'black')
    .attr('font-size', '2em');

mainGroup
    .append('text')
    .attr('fill', 'black')
    .attr('id', 'yeartext')
    .attr('font-size', '2em')
    .attr('x', `${innerWidth + position.left}`)
    .attr('y', `${innerHeight}`);

data.sort((a, b) => {
    return b.globalsale - a.globalsale;
});

const paint = async (years, i) => {
    if (i === years.length) {
        return;
    }
    await render(data.filter(d => d.year === years[i]));
    paint(years, i + 1);
};
paint(years, 0);
function render(data = []) {
    data.sort((a, b) => {
        return a.globalsale - b.globalsale;
    });

    // 重新画scale
    xScale.domain([0, d3.max(data, d => d.globalsale)]).range([0, innerWidth]);
    yScale
        .domain(data.map(e => e.platform))
        .range([innerHeight, 0])
        .padding(0.1);

    // data-join
    const enter = mainGroup
        .selectAll('rect')
        .data(data, d => d.platform)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('height', yScale.bandwidth())
        .attr('x', 0)
        .attr('fill', d => colorScale(d.platform));
    const enterText = mainGroup
        .selectAll('.datatext')
        .data(data, d => d.platform)
        .enter()
        .append('text')
        .attr('class', 'datatext')
        .attr('alignment-baseline', 'central');

    // 年份文字
    d3.select('#yeartext').text(data[0].year).raise();

    // transition动画定义
    const transition = d3.transition().duration(1000).ease(d3.easeLinear);
    mainGroup
        .selectAll('.bar')
        .merge(enter)
        .transition(transition)
        .attr('width', d => xScale(d.globalsale))
        .attr('y', d => yScale(d.platform))
        .attr('height', yScale.bandwidth());
    mainGroup
        .selectAll('.datatext')
        .merge(enterText)
        .transition(transition)
        // 只会对应用了transition之后的属性做动画计算
        .attr('x', d => 4 + xScale(d.globalsale))
        .attr('y', d => yScale(d.platform) + yScale.bandwidth() / 2)
        .tween('text', function (d) {
            const formatPercent = d3.format('.2f');
            // 插值函数，用于将数据映射到连续范围内的技术，用于在可视化中创建平滑的过渡效果
            const i = d3.interpolate(this.textContent, d.globalsale);
            // t是ease time function，范围是[0, 1]， i(t)用于还原值
            return function (t) {
                // textContent指向了text node
                this.textContent = formatPercent(i(t));
            };
        });

    xAxisGroup.transition(transition).call(xAxis);
    yAxisGroup.transition(transition).call(yAxis);

    return transition.end();
}
