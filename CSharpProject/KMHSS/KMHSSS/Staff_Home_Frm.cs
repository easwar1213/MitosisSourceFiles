using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace KMHSSS
{
    public partial class Staff_Home_Frm : Form
    {
        public Staff_Home_Frm()
        {
            InitializeComponent();
        }

        private void Staff_Home_Frm_Load(object sender, EventArgs e)
        {           
            Date_Lbl.Text = DateTime.Today.ToString("dd/MM/yyyy");
            timer1.Start();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            Time_Lbl.Text = DateTime.Now.ToString("hh:mm:ss tt");
        }

        private void admissionMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Admin_Student_Master_Frm asmf = new Admin_Student_Master_Frm();
            asmf.Show();
        }                 

        private void schoolBillToolStripMenuItem_Click(object sender, EventArgs e)
        {
            School_Bill_Frm sbf = new School_Bill_Frm();
            sbf.Show();
        }

        private void hostelBillToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Bill_Frm hbf = new Hostel_Bill_Frm();
            hbf.Show();
        }

        private void vanBillToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Van_Bill_Frm vbf = new Van_Bill_Frm();
            vbf.Show();
        }

        private void schoolBillToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            Other_School_Bill_Frm osbf = new Other_School_Bill_Frm();
            osbf.Show();
        }

        private void hostelBillToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            Other_Hostel_Bill_Frm ohbf = new Other_Hostel_Bill_Frm();
            ohbf.Show();
        }       

        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Environment.Exit(0);
        }

        private void stationaryBillToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stationary_Bill_Frm sbf = new Stationary_Bill_Frm();
            sbf.Show();
        }

        private void schoolBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            School_Bill_Report_Frm sbrf = new School_Bill_Report_Frm();
            sbrf.Show();
        }

        private void hostelBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Bill_Report_Frm hbrf = new Hostel_Bill_Report_Frm();
            hbrf.Show();
        }

        private void vanBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Van_Bill_Report_Frm vbrf = new Van_Bill_Report_Frm();
            vbrf.Show();
        }

        private void schoolReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Other_School_Bill_Report_Frm osbrf = new Other_School_Bill_Report_Frm();
            osbrf.Show();
        }

        private void hostelReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Other_Hostel_Bill_Report_Frm ohbrf = new Other_Hostel_Bill_Report_Frm();
            ohbrf.Show();
        }

        private void stationaryBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stationary_Billing_Report_Frm sbrf = new Stationary_Billing_Report_Frm();
            sbrf.Show();
        }

        private void overAllBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Daily_Overall_Bill_Report_Frm dobrf = new Daily_Overall_Bill_Report_Frm();
            dobrf.Show();
        }

        private void dailyNetBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Daily_Bill_Turnover_Report_Frm dbtrf = new Daily_Bill_Turnover_Report_Frm();
            dbtrf.Show();
        }

        private void classNameListReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Class_Name_List_Frm cnlf = new Class_Name_List_Frm();
            cnlf.Show();
        }

        private void toolStripMenuItem1_Click(object sender, EventArgs e)
        {
            Staff_Student_Promotion_Details_Frm sspdf = new Staff_Student_Promotion_Details_Frm();
            sspdf.Show();
        }

        private void toolStripMenuItem2_Click(object sender, EventArgs e)
        {
            Student_Bill_Summary_Details_Frm swbhf = new Student_Bill_Summary_Details_Frm();
            swbhf.Show();
        }      
        
    }
}
