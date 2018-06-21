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
    public partial class Admin_Home_Frm : Form
    {
        public Admin_Home_Frm()
        {
            InitializeComponent();
        }

        private void Admin_Home_Frm_Load(object sender, EventArgs e)
        {
            Date_Lbl.Text = DateTime.Today.ToString("dd/MM/yyyy");
            timer1.Start();  
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            Time_Lbl.Text = DateTime.Now.ToString("hh:mm:ss tt");
        }          
             

        private void schoolFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            School_Fees_Master_Frm sfmf = new School_Fees_Master_Frm();
            sfmf.Show();
        }

        private void HostelFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Fees_Master_Frm hfmf = new Hostel_Fees_Master_Frm();
            hfmf.Show();
        }

        private void vanFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Van_Fees_Master_Frm vfmf = new Van_Fees_Master_Frm();
            vfmf.Show();
        }

        private void otherFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Other_Fees_Master_Frm ofmf = new Other_Fees_Master_Frm();
            ofmf.Show();
        }                

        private void schoolBillToolStripMenuItem_Click(object sender, EventArgs e)
        {
            School_Bill_Frm sbf = new School_Bill_Frm();
            sbf.Show();
        }

        private void HostelBillToolStripMenuItem_Click(object sender, EventArgs e)
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

        private void HostelBillToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            Other_Hostel_Bill_Frm ohbf = new Other_Hostel_Bill_Frm();
            ohbf.Show();
        }

        private void admissionDetailsToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            Student_Admission_Details_Frm vsadf = new Student_Admission_Details_Frm();
            vsadf.Show();
        }

        private void classDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Class_Wise_Analysis_Details_Frm vscdf = new Student_Class_Wise_Analysis_Details_Frm();
            vscdf.Show();
        }

        private void HostelDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Student_Analysis_Details_Frm vhsdf = new Hostel_Student_Analysis_Details_Frm();
            vhsdf.Show();
        }

        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Environment.Exit(0);
        }

        private void admissionReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Admission_Details_Report_Frm samrf = new Student_Admission_Details_Report_Frm();
            samrf.Show();
        }

        private void studentPersonalReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Personal_Details_Report_Frm spdrf = new Student_Personal_Details_Report_Frm();
            spdrf.Show();
        }

        private void HostelStudentsReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Students_Details_Report_Frm hsdrf = new Hostel_Students_Details_Report_Frm();
            hsdrf.Show();
        }
                
        private void tcMasterReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_TC_Issue_Details_Report_Frm tcmrf = new Student_TC_Issue_Details_Report_Frm();
            tcmrf.Show();
        }

        private void groupMasterReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Group_Master_Report_Frm gmrf = new Group_Master_Report_Frm();
            gmrf.Show();
        }

        private void schoolFeesMasterReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            School_Fees_Master_Report_Frm sfmrf = new School_Fees_Master_Report_Frm();
            sfmrf.Show();
        }

        private void HostelFeesMasterReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Fees_Master_Report_Frm hfmrf = new Hostel_Fees_Master_Report_Frm();
            hfmrf.Show();
        }

        private void vanFeesMasterReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Van_Fees_Master_Report_Frm vfmrf = new Van_Fees_Master_Report_Frm();
            vfmrf.Show();
        }

        private void otherFeesMasterReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Other_Fees_Master_Report_Frm ofmrf = new Other_Fees_Master_Report_Frm();
            ofmrf.Show();
        }       

        private void stationaryFeesMasterReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stationary_Fees_Master_Report_Frm sfmrf = new Stationary_Fees_Master_Report_Frm();
            sfmrf.Show();
        }

        private void schoolBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            School_Bill_Report_Frm sbrf = new School_Bill_Report_Frm();
            sbrf.Show();
        }

        private void HostelBillReportToolStripMenuItem_Click(object sender, EventArgs e)
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

        private void HostelReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Other_Hostel_Bill_Report_Frm ohbrf = new Other_Hostel_Bill_Report_Frm();
            ohbrf.Show();
        }

        private void stationaryBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stationary_Billing_Report_Frm sbrf = new Stationary_Billing_Report_Frm();
            sbrf.Show();
        }

        private void schoolFeesReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outsatanding_School_Fees_Report_Frm osfrf = new Outsatanding_School_Fees_Report_Frm();
            osfrf.Show();
        }

        private void HostelFeesReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_Hostel_Fees_Report_Frm ohfrf = new Outstanding_Hostel_Fees_Report_Frm();
            ohfrf.Show();
        }

        private void vanFeesReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_Van_Fees_Report_Frm ovfrf = new Outstanding_Van_Fees_Report_Frm();
            ovfrf.Show();
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

        private void stationaryBillToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stationary_Bill_Frm stbf = new Stationary_Bill_Frm();
            stbf.Show();
        }

        private void schoolFeesDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_School_Fees_Details_Frm sfnodf = new Outstanding_School_Fees_Details_Frm();
            sfnodf.Show();
        }

        private void HostelFeesDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_Hostel_Fees_Details_Frm hfnpdf = new Outstanding_Hostel_Fees_Details_Frm();
            hfnpdf.Show();
        }

        private void stationaryFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stationary_Fees_Master_Frm sfmf = new Stationary_Fees_Master_Frm();
            sfmf.Show();
        }

        private void classNameListToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            Class_Name_List_Frm cnlf = new Class_Name_List_Frm();
            cnlf.Show();
        }     

        private void vanFeesDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_Van_Fees_Details_Frm vfnpdf = new Outstanding_Van_Fees_Details_Frm();
            vfnpdf.Show();
        }

        private void toolStripMenuItem1_Click(object sender, EventArgs e)
        {
            Student_Admission_Class_Wise_Report_Frm sacrf = new Student_Admission_Class_Wise_Report_Frm();
            sacrf.Show();
        }

        private void toolStripMenuItem2_Click(object sender, EventArgs e)
        {
            Student_Class_Wise_Extra_Analysis_Details_Frm vsadcf = new Student_Class_Wise_Extra_Analysis_Details_Frm();
            vsadcf.Show();
        }

       
        private void toolStripMenuItem3_Click(object sender, EventArgs e)
        {
            Backup_Frm bf = new Backup_Frm();
            bf.Show();
        }      
        
        private void stationaryFeesDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_Stationary_Fees_Details_Frm sfnpdf = new Outstanding_Stationary_Fees_Details_Frm();
            sfnpdf.Show();
        }

        private void stationaryFeesReporToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_Stationary_Fees_Report_Frm ostfd = new Outstanding_Stationary_Fees_Report_Frm();
            ostfd.Show();
        }

        private void loginAccountsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Login_Account_Master_Frm uamf = new Login_Account_Master_Frm();
            uamf.Show();
        }

        private void toolStripMenuItem4_Click(object sender, EventArgs e)
        {
            Student_Promotion_Details_Frm spdf = new Student_Promotion_Details_Frm();
            spdf.Show();
        }

        private void classMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Class_Master_Frm cmf = new Class_Master_Frm();
            cmf.Show();
        }

        private void sectionMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Section_Master_Frm smf = new Section_Master_Frm();
            smf.Show();
        }        

        private void admissionMasterToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            Admin_Student_Master_Frm asmf = new Admin_Student_Master_Frm();
            asmf.Show();
        }

        private void studentPersonalDetailsMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Personal_Details_Master_Frm samf = new Student_Personal_Details_Master_Frm();
            samf.Show();
        }

        private void promotionWHStudentDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Promotion_With_Held_Student_Details_Frm fpsdf = new Promotion_With_Held_Student_Details_Frm();
            fpsdf.Show();
        }

        private void tCMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            TC_Master_Frm tcmf = new TC_Master_Frm();
            tcmf.Show();
        }

        private void fineMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Fine_Master_Frm fmf = new Fine_Master_Frm();
            fmf.Show();
        }

        private void groupMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Group_Master_Frm gmf = new Group_Master_Frm();
            gmf.Show();
        }

        private void academyYearMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Academy_Year_Master_Frm aymf = new Academy_Year_Master_Frm();
            aymf.Show();
        }

        private void termTypeMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Term_Type_Master_Frm ttmf = new Term_Type_Master_Frm();
            ttmf.Show();
        }

        private void maintanceTypeMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Maintance_Type_Master_Frm mtmf = new Maintance_Type_Master_Frm();
            mtmf.Show();
        }

        private void placeMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Place_Master_Frm pmf = new Place_Master_Frm();
            pmf.Show();
        }

        private void tripTypeMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Trip_Type_Master_Frm ttmf = new Trip_Type_Master_Frm();
            ttmf.Show();
        }

        private void particularsMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Particulars_Master_Frm pmf = new Particulars_Master_Frm();
            pmf.Show();
        }

        private void monthMasterToolStripMenuItem_Click_1(object sender, EventArgs e)
        {
            Month_Master_Frm mmf = new Month_Master_Frm();
            mmf.Show();
        }

        private void studentContactDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Contact_Details_Frm scdf = new Student_Contact_Details_Frm();
            scdf.Show();
        }

        private void academyYearWiseStudentDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Academy_Year_Wise_Student_Details_Frm aywsdf = new Academy_Year_Wise_Student_Details_Frm();
            aywsdf.Show();
        }

        private void studentContactDetailsReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Contact_Details_Report_Frm scdrf = new Student_Contact_Details_Report_Frm();
            scdrf.Show();
        }

        private void promotionEligibleStudentDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Promotion_Eligible_Student_Details_Frm pesdrf = new Promotion_Eligible_Student_Details_Frm();
            pesdrf.Show();
        }

        private void promotionNotEligibleStudentDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Promotion_Non_Eligible_Student_Details_Frm pnesrf = new Promotion_Non_Eligible_Student_Details_Frm();
            pnesrf.Show();
        }

        private void arrearStudentIndividualViewDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Arrear_Student_Individual_View_Details_Frm asivdf = new Arrear_Student_Individual_View_Details_Frm();
            asivdf.Show();
        }

        private void particularsPaidDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Particulars_Fees_Paid_Details_Frm kypd = new Particulars_Fees_Paid_Details_Frm();
            kypd.Show();
        }

        private void studentWiseBillHistoryToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Bill_Summary_Details_Frm swbhf = new Student_Bill_Summary_Details_Frm();
            swbhf.Show();
        }

        private void toolStripMenuItem6_Click(object sender, EventArgs e)
        {
            Hostel_Maintance_Fees_Master_Frm hmfmf = new Hostel_Maintance_Fees_Master_Frm();
            hmfmf.Show();
        }

        private void toolStripMenuItem7_Click(object sender, EventArgs e)
        {
            Hostel_Deposit_Master_Frm hdmf = new Hostel_Deposit_Master_Frm();
            hdmf.Show();
        }

        private void toolStripMenuItem8_Click(object sender, EventArgs e)
        {
            Van_Student_Analysis_Details_Frm vvsdf = new Van_Student_Analysis_Details_Frm();
            vvsdf.Show();
        }   
    }
}

