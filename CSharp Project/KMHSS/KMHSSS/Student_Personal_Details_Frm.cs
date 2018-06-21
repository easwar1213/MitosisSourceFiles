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
    public partial class Student_Personal_Details_Frm : Form
    {
        string query;
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Student_Personal_Details_Frm()
        {
            InitializeComponent();
        }

        private void Student_Personal_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                SYear_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_AYear_CBox()
        {
            try
            {
                SYear_CBox.Items.Clear();
                query = "select SYear from Academy_Year_Master_Table";
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
                query = "select Section from Section_Master_Table where Class='" + Class_CBox.Text + "'";
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
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
        }

        public void ACSFill_Grid()
        {
            try
            {
                query = "select * from Student_Personal_Details_Master_Table P where P.Admission_No in (select A.Admission_No from Student_Admission_Master_Table A where A.SYear='"+SYear_CBox.Text+"' and A.EYear='"+EYear_Txt.Text+"' and A.Class='"+Class_CBox.Text+"' and A.Section='"+Sec_CBox.Text+"') order by P.Class,P.Section,P.Gender Asc;";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Personal_Details_dataGridView1.DataSource = dt;
                Student_Personal_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Personal_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Personal_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Personal_Details_dataGridView1.Columns[4].HeaderText = "Father Name";
                Student_Personal_Details_dataGridView1.Columns[5].HeaderText = "Mother Name";
                Student_Personal_Details_dataGridView1.Columns[6].HeaderText = "Dob";
                Student_Personal_Details_dataGridView1.Columns[7].HeaderText = "Gender";
                Student_Personal_Details_dataGridView1.Columns[8].HeaderText = "Address";
                Student_Personal_Details_dataGridView1.Columns[9].HeaderText = "Father Occupation";
                Student_Personal_Details_dataGridView1.Columns[10].HeaderText = "Mother Occupation";
                Student_Personal_Details_dataGridView1.Columns[11].HeaderText = "PStudy";
                Student_Personal_Details_dataGridView1.Columns[12].HeaderText = "School_Name";
                Student_Personal_Details_dataGridView1.Columns[13].HeaderText = "PClass";
                Student_Personal_Details_dataGridView1.Columns[14].HeaderText = "Class";
                Student_Personal_Details_dataGridView1.Columns[15].HeaderText = "Section";
                Student_Personal_Details_dataGridView1.Columns[16].HeaderText = "Group Code";
                Student_Personal_Details_dataGridView1.Columns[17].HeaderText = "Branch";
                Student_Personal_Details_dataGridView1.Columns[18].HeaderText = "Email";
                Student_Personal_Details_dataGridView1.Columns[19].HeaderText = "Father_Mob";
                Student_Personal_Details_dataGridView1.Columns[20].HeaderText = "Mother_Mob";
                Student_Personal_Details_dataGridView1.Columns[21].HeaderText = "Nationality";
                Student_Personal_Details_dataGridView1.Columns[22].HeaderText = "Religion";
                Student_Personal_Details_dataGridView1.Columns[23].HeaderText = "Community";
                Student_Personal_Details_dataGridView1.Columns[24].HeaderText = "Caste";
                Student_Personal_Details_dataGridView1.Columns[25].HeaderText = "Identity1";
                Student_Personal_Details_dataGridView1.Columns[26].HeaderText = "Identity2";
                Student_Personal_Details_dataGridView1.Columns[27].HeaderText = "FAIncome";
                Student_Personal_Details_dataGridView1.Columns[28].HeaderText = "MAIncome";
                Student_Personal_Details_dataGridView1.Columns[29].HeaderText = "photo";
                Student_Personal_Details_dataGridView1.Columns[1].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[2].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[3].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[4].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[5].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[6].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[7].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[8].Width = 1000;
                Student_Personal_Details_dataGridView1.Columns[9].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[10].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[11].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[12].Width = 330;
                Student_Personal_Details_dataGridView1.Columns[13].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[14].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[15].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[16].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[17].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[18].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[19].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[20].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[21].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[22].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[23].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[24].Width = 380;
                Student_Personal_Details_dataGridView1.Columns[25].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[26].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[27].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[28].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[29].Width = 150;
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
                query = "select * from Student_Personal_Details_Master_Table P where P.Admission_No in (select A.Admission_No from Student_Admission_Master_Table A where A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "') order by P.Class,P.Section,P.Gender Asc;";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Personal_Details_dataGridView1.DataSource = dt;
                Student_Personal_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Personal_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Personal_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Personal_Details_dataGridView1.Columns[4].HeaderText = "Father Name";
                Student_Personal_Details_dataGridView1.Columns[5].HeaderText = "Mother Name";
                Student_Personal_Details_dataGridView1.Columns[6].HeaderText = "Dob";
                Student_Personal_Details_dataGridView1.Columns[7].HeaderText = "Gender";
                Student_Personal_Details_dataGridView1.Columns[8].HeaderText = "Address";
                Student_Personal_Details_dataGridView1.Columns[9].HeaderText = "Father Occupation";
                Student_Personal_Details_dataGridView1.Columns[10].HeaderText = "Mother Occupation";
                Student_Personal_Details_dataGridView1.Columns[11].HeaderText = "PStudy";
                Student_Personal_Details_dataGridView1.Columns[12].HeaderText = "School_Name";
                Student_Personal_Details_dataGridView1.Columns[13].HeaderText = "PClass";
                Student_Personal_Details_dataGridView1.Columns[14].HeaderText = "Class";
                Student_Personal_Details_dataGridView1.Columns[15].HeaderText = "Section";
                Student_Personal_Details_dataGridView1.Columns[16].HeaderText = "Group Code";
                Student_Personal_Details_dataGridView1.Columns[17].HeaderText = "Branch";
                Student_Personal_Details_dataGridView1.Columns[18].HeaderText = "Email";
                Student_Personal_Details_dataGridView1.Columns[19].HeaderText = "Father_Mob";
                Student_Personal_Details_dataGridView1.Columns[20].HeaderText = "Mother_Mob";
                Student_Personal_Details_dataGridView1.Columns[21].HeaderText = "Nationality";
                Student_Personal_Details_dataGridView1.Columns[22].HeaderText = "Religion";
                Student_Personal_Details_dataGridView1.Columns[23].HeaderText = "Community";
                Student_Personal_Details_dataGridView1.Columns[24].HeaderText = "Caste";
                Student_Personal_Details_dataGridView1.Columns[25].HeaderText = "Identity1";
                Student_Personal_Details_dataGridView1.Columns[26].HeaderText = "Identity2";
                Student_Personal_Details_dataGridView1.Columns[27].HeaderText = "FAIncome";
                Student_Personal_Details_dataGridView1.Columns[28].HeaderText = "MAIncome";
                Student_Personal_Details_dataGridView1.Columns[29].HeaderText = "photo";
                Student_Personal_Details_dataGridView1.Columns[1].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[2].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[3].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[4].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[5].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[6].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[7].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[8].Width = 1000;
                Student_Personal_Details_dataGridView1.Columns[9].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[10].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[11].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[12].Width = 330;
                Student_Personal_Details_dataGridView1.Columns[13].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[14].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[15].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[16].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[17].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[18].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[19].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[20].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[21].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[22].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[23].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[24].Width = 380;
                Student_Personal_Details_dataGridView1.Columns[25].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[26].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[27].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[28].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[29].Width = 150;
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
                query = "select * from Student_Personal_Details_Master_Table P where P.Admission_No in (select A.Admission_No from Student_Admission_Master_Table A where A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "') order by P.Class,P.Section,P.Gender Asc;";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Personal_Details_dataGridView1.DataSource = dt;
                Student_Personal_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Personal_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Personal_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Personal_Details_dataGridView1.Columns[4].HeaderText = "Father Name";
                Student_Personal_Details_dataGridView1.Columns[5].HeaderText = "Mother Name";
                Student_Personal_Details_dataGridView1.Columns[6].HeaderText = "Dob";
                Student_Personal_Details_dataGridView1.Columns[7].HeaderText = "Gender";
                Student_Personal_Details_dataGridView1.Columns[8].HeaderText = "Address";
                Student_Personal_Details_dataGridView1.Columns[9].HeaderText = "Father Occupation";
                Student_Personal_Details_dataGridView1.Columns[10].HeaderText = "Mother Occupation";
                Student_Personal_Details_dataGridView1.Columns[11].HeaderText = "PStudy";
                Student_Personal_Details_dataGridView1.Columns[12].HeaderText = "School_Name";
                Student_Personal_Details_dataGridView1.Columns[13].HeaderText = "PClass";
                Student_Personal_Details_dataGridView1.Columns[14].HeaderText = "Class";
                Student_Personal_Details_dataGridView1.Columns[15].HeaderText = "Section";
                Student_Personal_Details_dataGridView1.Columns[16].HeaderText = "Group Code";
                Student_Personal_Details_dataGridView1.Columns[17].HeaderText = "Branch";
                Student_Personal_Details_dataGridView1.Columns[18].HeaderText = "Email";
                Student_Personal_Details_dataGridView1.Columns[19].HeaderText = "Father_Mob";
                Student_Personal_Details_dataGridView1.Columns[20].HeaderText = "Mother_Mob";
                Student_Personal_Details_dataGridView1.Columns[21].HeaderText = "Nationality";
                Student_Personal_Details_dataGridView1.Columns[22].HeaderText = "Religion";
                Student_Personal_Details_dataGridView1.Columns[23].HeaderText = "Community";
                Student_Personal_Details_dataGridView1.Columns[24].HeaderText = "Caste";
                Student_Personal_Details_dataGridView1.Columns[25].HeaderText = "Identity1";
                Student_Personal_Details_dataGridView1.Columns[26].HeaderText = "Identity2";
                Student_Personal_Details_dataGridView1.Columns[27].HeaderText = "FAIncome";
                Student_Personal_Details_dataGridView1.Columns[28].HeaderText = "MAIncome";
                Student_Personal_Details_dataGridView1.Columns[29].HeaderText = "photo";
                Student_Personal_Details_dataGridView1.Columns[1].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[2].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[3].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[4].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[5].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[6].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[7].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[8].Width = 1000;
                Student_Personal_Details_dataGridView1.Columns[9].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[10].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[11].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[12].Width = 330;
                Student_Personal_Details_dataGridView1.Columns[13].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[14].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[15].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[16].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[17].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[18].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[19].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[20].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[21].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[22].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[23].Width = 120;
                Student_Personal_Details_dataGridView1.Columns[24].Width = 380;
                Student_Personal_Details_dataGridView1.Columns[25].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[26].Width = 350;
                Student_Personal_Details_dataGridView1.Columns[27].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[28].Width = 150;
                Student_Personal_Details_dataGridView1.Columns[29].Width = 150;
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
                query = "select * from Student_Personal_Details_Master_Table P where P.Admission_No in (select A.Admission_No from Student_Admission_Master_Table A where A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' and A.Section='" + Sec_CBox.Text + "') order by P.Class,P.Section,P.Gender Asc;";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportSPDR obj = new CrystalReportSPDR();
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
                query = "select * from Student_Personal_Details_Master_Table P where P.Admission_No in (select A.Admission_No from Student_Admission_Master_Table A where A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "') order by P.Class,P.Section,P.Gender Asc;";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportSPDR obj = new CrystalReportSPDR();
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
                query = "select * from Student_Personal_Details_Master_Table P where P.Admission_No in (select A.Admission_No from Student_Admission_Master_Table A where A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "') order by P.Class,P.Section,P.Gender Asc;";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportSPDR obj = new CrystalReportSPDR();
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

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true)
                {
                    ACSFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false)
                {
                    ACFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false)
                {
                    AFill_Grid();
                }               
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Print_Lbl_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true)
                {
                    PACSFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false)
                {
                    PACFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false)
                {
                    PAFill_Grid();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }       
    }
}
