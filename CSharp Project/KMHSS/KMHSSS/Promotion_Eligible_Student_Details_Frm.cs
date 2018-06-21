using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;
using Microsoft.VisualBasic;
using CrystalDecisions.CrystalReports.Engine;

namespace KMHSSS
{
    public partial class Promotion_Eligible_Student_Details_Frm : Form
    {
        string query;
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Promotion_Eligible_Student_Details_Frm()
        {
            InitializeComponent();
        }        

        private void Promotion_Eligible_Student_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                AYear_CHBox.Checked = true;
                SYear_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }
        }

        public void fill_AYear_CBox()
        {
            try
            {
                SYear_CBox.Items.Clear();
                query = "select distinct(SYear) from Academy_Year_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    SYear_CBox.Items.Add(dr["SYear"].ToString());
                }
                con.Close();
                last = SYear_CBox.Items.Count - 1;
                SYear_CBox.SelectedIndex = last;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }


        public void fill_Class_CBox()
        {
            try
            {
                Class_CBox.Items.Clear();
                query = "select Class from Class_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Class_CBox.Items.Add(dr["Class"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Section_CBox()
        {
            try
            {
                Sec_CBox.Items.Clear();
                query = "select distinct(Section) from Section_Master_Table where Class='" + Class_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Sec_CBox.Items.Add(dr["Section"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSFill_Grid()
        {
            try
            {
                query = "select P.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No in(select P.Admission_No from Pending_Payment_Table P where P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "' and P.SchoolBillPay='0' and P.HostelBillPay='0' and P.VanBillPay='0' and P.StationaryBillPay='0') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' and A.Section='" + Sec_CBox.Text + "' order by A.Class,A.Section,A.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Promotion_Eligible_Student_Details_dataGridView1.DataSource = dt;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[1].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[2].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[3].Width = 350;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[4].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[5].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[6].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[7].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[8].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[9].Width = 330;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[10].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[11].Width = 200;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[12].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[13].Width = 330;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[14].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[15].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[16].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[17].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACFill_Grid()
        {
            try
            {
                query = "select P.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No in(select P.Admission_No from Pending_Payment_Table P where P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "' and P.SchoolBillPay='0' and P.HostelBillPay='0' and P.VanBillPay='0' and P.StationaryBillPay='0') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' order by A.Class,A.Section,A.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Promotion_Eligible_Student_Details_dataGridView1.DataSource = dt;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[1].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[2].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[3].Width = 350;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[4].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[5].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[6].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[7].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[8].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[9].Width = 330;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[10].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[11].Width = 200;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[12].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[13].Width = 330;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[14].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[15].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[16].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[17].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AFill_Grid()
        {
            try
            {
                query = "select P.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No in(select P.Admission_No from Pending_Payment_Table P where P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "' and P.SchoolBillPay='0' and P.HostelBillPay='0' and P.VanBillPay='0' and P.StationaryBillPay='0') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' order by A.Class,A.Section,A.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Promotion_Eligible_Student_Details_dataGridView1.DataSource = dt;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Promotion_Eligible_Student_Details_dataGridView1.Columns[1].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[2].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[3].Width = 350;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[4].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[5].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[6].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[7].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[8].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[9].Width = 330;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[10].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[11].Width = 200;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[12].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[13].Width = 330;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[14].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[15].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[16].Width = 150;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[17].Width = 120;
                Promotion_Eligible_Student_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PACSFill_Grid()
        {
            try
            {
                query = "select P.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No in(select P.Admission_No from Pending_Payment_Table P where P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "' and P.SchoolBillPay='0' and P.HostelBillPay='0' and P.VanBillPay='0' and P.StationaryBillPay='0') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' and A.Section='" + Sec_CBox.Text + "' order by A.Class,A.Section,A.Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PACFill_Grid()
        {
            try
            {
                query = "select P.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No in(select P.Admission_No from Pending_Payment_Table P where P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "' and P.SchoolBillPay='0' and P.HostelBillPay='0' and P.VanBillPay='0' and P.StationaryBillPay='0') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' order by A.Class,A.Section,A.Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PAFill_Grid()
        {
            try
            {
                query = "select P.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No in(select P.Admission_No from Pending_Payment_Table P where P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "' and P.SchoolBillPay='0' and P.HostelBillPay='0' and P.VanBillPay='0' and P.StationaryBillPay='0') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' order by A.Class,A.Section,A.Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }   
               

        private void SYear_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select EYear from Academy_Year_Master_Table where SYear='" + SYear_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    EYear_Txt.Text = dr["EYear"].ToString().Trim();
                }
                con.Close();
                AFill_Grid();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
            ACFill_Grid();
        }

        private void AYear_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            SYear_CBox.Focus();
        }

        private void Class_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Class_CBox.Focus();
        }

        private void Section_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Sec_CBox.Focus();
        }

        private void Promotion_Eligible_Student_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void Sec_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            ACSFill_Grid();
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true)
                {
                    ACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false)
                {
                    ACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false)
                {
                    AFill_Grid();
                    SYear_CBox.Focus();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Print_Lbl_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true)
                {
                    PACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false)
                {
                    PACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false)
                {
                    PAFill_Grid();
                    SYear_CBox.Focus();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }                  
    }
}
