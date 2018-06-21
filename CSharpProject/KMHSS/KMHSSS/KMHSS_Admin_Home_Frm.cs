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
    public partial class KMHSS_Admin_Home_Frm : Form
    {
        public KMHSS_Admin_Home_Frm()
        {
            InitializeComponent();
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

        private void groupMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Group_Master_Frm gmf = new Group_Master_Frm();
            gmf.Show();
        }

        private void academyMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Academy_Year_Master_Frm aymf = new Academy_Year_Master_Frm();
            aymf.Show();
        }

        private void termTypeMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Term_Type_Master_Frm ttmf = new Term_Type_Master_Frm();
            ttmf.Show();
        }

        private void maintananceMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Maintance_Type_Master_Frm mtmf = new Maintance_Type_Master_Frm();
            mtmf.Show();
        }

        private void placeMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Place_Master_Frm pmf = new Place_Master_Frm();
            pmf.Show();
        }

        private void teripTypeMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Trip_Type_Master_Frm ttmf = new Trip_Type_Master_Frm();
            ttmf.Show();
        }

        private void particularsMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Particulars_Master_Frm pmf = new Particulars_Master_Frm();
            pmf.Show();
        }

        private void monthMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Month_Master_Frm mmf = new Month_Master_Frm();
            mmf.Show();
        }

        private void schoolFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            School_Fees_Master_Frm sfmf = new School_Fees_Master_Frm();
            sfmf.Show();
        }

        private void hostelFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Fees_Master_Frm hfmf = new Hostel_Fees_Master_Frm();
            hfmf.Show();
        }

        private void hostelMaintananceFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Maintance_Fees_Master_Frm hmfmf = new Hostel_Maintance_Fees_Master_Frm();
            hmfmf.Show();
        }

        private void hostelDepositMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Deposit_Master_Frm hdmf = new Hostel_Deposit_Master_Frm();
            hdmf.Show();
        }

        private void vanFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Van_Fees_Master_Frm vfmf = new Van_Fees_Master_Frm();
            vfmf.Show();
        }

        private void stationaryFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stationary_Fees_Master_Frm sfmf = new Stationary_Fees_Master_Frm();
            sfmf.Show();
        }

        private void otherFeesMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Other_Fees_Master_Frm ofmf = new Other_Fees_Master_Frm();
            ofmf.Show();
        }

        private void fineMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Fine_Master_Frm fmf = new Fine_Master_Frm();
            fmf.Show();
        }

        private void studentAdmissionMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Admin_Student_Master_Frm asmf = new Admin_Student_Master_Frm();
            asmf.Show();
        }

        private void studentPersonalDetailsMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Personal_Details_Master_Frm samf = new Student_Personal_Details_Master_Frm();
            samf.Show();
        }

        private void studentContactDetailsMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Contact_Details_Frm scdf = new Student_Contact_Details_Frm();
            scdf.Show();
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

        private void stationaryBillToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stationary_Bill_Frm stbf = new Stationary_Bill_Frm();
            stbf.Show();
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

        private void studentAdmissionDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Admission_Details_Frm vsadf = new Student_Admission_Details_Frm();
            vsadf.Show();
        }

        private void studentPersonalDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Personal_Details_Frm spdf = new Student_Personal_Details_Frm();
            spdf.Show();
        }

        private void studentClassWiseDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Class_Wise_Analysis_Details_Frm scwdf = new Student_Class_Wise_Analysis_Details_Frm();
            scwdf.Show();
        }

        private void studentClassWiseExtraAnalysisDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Class_Wise_Extra_Analysis_Details_Frm scweadf = new Student_Class_Wise_Extra_Analysis_Details_Frm();
            scweadf.Show();
        }

        private void studentClassWiseExemptedAnalysisDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Class_Wise_Exempted_Analysis_Details_Frm scwemadf = new Student_Class_Wise_Exempted_Analysis_Details_Frm();
            scwemadf.Show();
        }

        private void hostelStudentAnalysisDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hostel_Student_Analysis_Details_Frm hsadf = new Hostel_Student_Analysis_Details_Frm();
            hsadf.Show();
        }

        private void vanStudentAnalysisDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Van_Student_Analysis_Details_Frm vsadf = new Van_Student_Analysis_Details_Frm();
            vsadf.Show();
        }               
       
        private void studentOutstandingArrearsDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Arrear_Student_Individual_View_Details_Frm asivdf = new Arrear_Student_Individual_View_Details_Frm();
            asivdf.Show();
        }

        private void studentBillSummaryDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Bill_Summary_Details_Frm swbhf = new Student_Bill_Summary_Details_Frm();
            swbhf.Show();
        }

        private void promotionEligibleStudentDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Promotion_Eligible_Student_Details_Frm pesdf = new Promotion_Eligible_Student_Details_Frm();
            pesdf.Show();
        }

        private void promotionNonEligibleStudentDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Promotion_Non_Eligible_Student_Details_Frm pnesdf = new Promotion_Non_Eligible_Student_Details_Frm();
            pnesdf.Show();
        }

        private void studentPromotionDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Promotion_Details_Frm spdf = new Student_Promotion_Details_Frm();
            spdf.Show();
        }

        private void studentTCIssueDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            TC_Master_Frm tcmf = new TC_Master_Frm();
            tcmf.Show();
        }

        private void loginAccountToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Login_Account_Master_Frm uamf = new Login_Account_Master_Frm();
            uamf.Show();
        }

        private void backupToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Backup_Frm bf = new Backup_Frm();
            bf.Show();
        }

        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Environment.Exit(0);
        }

        private void schoolFeesToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_School_Fees_Details_Frm osfdf = new Outstanding_School_Fees_Details_Frm();
            osfdf.Show();
        }

        private void hostelFeesToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_Hostel_Fees_Details_Frm ohfdf = new Outstanding_Hostel_Fees_Details_Frm();
            ohfdf.Show();
        }

        private void vanFeesToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_Van_Fees_Details_Frm ovfdf = new Outstanding_Van_Fees_Details_Frm();
            ovfdf.Show();
        }

        private void stationaryFeesToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Outstanding_Stationary_Fees_Details_Frm ostfdf = new Outstanding_Stationary_Fees_Details_Frm();
            ostfdf.Show();
        }

        private void studentAdmissionReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Admission_Details_Report_Frm samrf = new Student_Admission_Details_Report_Frm();
            samrf.Show();
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

        private void stationaryBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Stationary_Billing_Report_Frm sbrf = new Stationary_Billing_Report_Frm();
            sbrf.Show();
        }

        private void otherSchoolBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Other_School_Bill_Report_Frm osbrf = new Other_School_Bill_Report_Frm();
            osbrf.Show();
        }

        private void otherHostelBillReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Other_Hostel_Bill_Report_Frm ohbrf = new Other_Hostel_Bill_Report_Frm();
            ohbrf.Show();
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

        private void studentTCIssuedReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_TC_Issue_Details_Report_Frm tcmrf = new Student_TC_Issue_Details_Report_Frm();
            tcmrf.Show();
        }

        private void studentContactDetailsReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Student_Contact_Details_Report_Frm scdrf = new Student_Contact_Details_Report_Frm();
            scdrf.Show();
        }

        private void toolStripMenuItem1_Click(object sender, EventArgs e)
        {
            Admission_Number_Wise_Student_Bill_History_Frm anwsbh = new Admission_Number_Wise_Student_Bill_History_Frm();
            anwsbh.Show();
        }

        private void vanNumberMasterToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Van_Number_Master_Frm vnmf = new Van_Number_Master_Frm();
            vnmf.Show();
        }        
    }
}
