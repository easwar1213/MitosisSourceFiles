﻿using System;
using System.Security.Permissions;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace KMHSSS
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Login_Frm());
        }
    }
       
}
