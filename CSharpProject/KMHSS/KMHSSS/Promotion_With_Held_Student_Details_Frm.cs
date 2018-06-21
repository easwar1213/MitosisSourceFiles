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
    public partial class Promotion_With_Held_Student_Details_Frm : Form
    {
        string query,Accomm_Type = "Hostel", Van = "YES";
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Promotion_With_Held_Student_Details_Frm()
        {
            InitializeComponent();
        }       

        public void SBFill_Grid()
        {
            try
            {
                query = "select S.Admission_No,S.Std_Name,S.Class,S.Section from Student_Admission_Master_Table S where S.Admission_No not in(select B.Admission_No from School_Bill_Master_Table B where Term_Type='" + Terms_CBox.Text + "') order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Fees_Pending_Student_Details_dataGridView1.DataSource = dt;
                Fees_Pending_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Fees_Pending_Student_Details_dataGridView1.Columns[2].HeaderText = "Student Name";
                Fees_Pending_Student_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Fees_Pending_Student_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Fees_Pending_Student_Details_dataGridView1.Columns[1].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[2].Width = 350;
                Fees_Pending_Student_Details_dataGridView1.Columns[3].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[4].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void HBFill_Grid()
        {
            try
            {
                query = "select S.Admission_No,S.Std_Name,S.Class,S.Section,S.SMonth from Student_Admission_Master_Table S where S.Accomm_Type='" + Accomm_Type + "' and S.Admission_No not in(select B.Admission_No from Hostel_Bill_Master_Table B where Month='" + HMonth_CBox.Text + "') order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Fees_Pending_Student_Details_dataGridView1.DataSource = dt;
                Fees_Pending_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Fees_Pending_Student_Details_dataGridView1.Columns[2].HeaderText = "Student Name";
                Fees_Pending_Student_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Fees_Pending_Student_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Fees_Pending_Student_Details_dataGridView1.Columns[5].HeaderText = "SMonth";
                Fees_Pending_Student_Details_dataGridView1.Columns[1].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[2].Width = 350;
                Fees_Pending_Student_Details_dataGridView1.Columns[3].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[4].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[5].Width = 150;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void VBFill_Grid()
        {
            try
            {
                query = "select S.Admission_No,S.Std_Name,S.Class,S.Section,S.SMonth from Student_Admission_Master_Table S where S.Van='" + Van + "' and S.Admission_No not in(select B.Admission_No from Van_Bill_Master_Table B where Month='" + VMonth_CBox.Text + "') order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Fees_Pending_Student_Details_dataGridView1.DataSource = dt;
                Fees_Pending_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Fees_Pending_Student_Details_dataGridView1.Columns[2].HeaderText = "Student Name";
                Fees_Pending_Student_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Fees_Pending_Student_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Fees_Pending_Student_Details_dataGridView1.Columns[5].HeaderText = "SMonth";
                Fees_Pending_Student_Details_dataGridView1.Columns[1].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[2].Width = 350;
                Fees_Pending_Student_Details_dataGridView1.Columns[3].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[4].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[5].Width = 150;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void STBFill_Grid()
        {
            try
            {
                query = "select S.Admission_No,S.Std_Name,S.Class,S.Section from Student_Admission_Master_Table S where S.Admission_No not in(select B.Admission_No from Stationary_Bill_Master_Table B) order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Fees_Pending_Student_Details_dataGridView1.DataSource = dt;
                Fees_Pending_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Fees_Pending_Student_Details_dataGridView1.Columns[2].HeaderText = "Student Name";
                Fees_Pending_Student_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Fees_Pending_Student_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Fees_Pending_Student_Details_dataGridView1.Columns[1].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[2].Width = 350;
                Fees_Pending_Student_Details_dataGridView1.Columns[3].Width = 120;
                Fees_Pending_Student_Details_dataGridView1.Columns[4].Width = 120;
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
                if (School_Bill_RBtn.Checked)
                {
                    if (Terms_CBox.Text != "")
                    {
                        SBFill_Grid();
                        Print_Btn.Enabled = true;
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Term");
                    }
                }
                else if (Hostel_Bill_RBtn.Checked)
                {
                    if (HMonth_CBox.Text != "")
                    {
                        HBFill_Grid();
                        Print_Btn.Enabled = true;
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Month");
                    }
                }
                else if (Van_Bill_RBtn.Checked)
                {
                    if (VMonth_CBox.Text != "")
                    {
                        VBFill_Grid();
                        Print_Btn.Enabled = true;
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Class and Section");
                    }
                }
                else if (Stationary_RBtn.Checked)
                {
                    STBFill_Grid();
                    Print_Btn.Enabled = true;
                }
                else
                {
                    MessageBox.Show("Plz Choose Any Bill Type");
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Promotion_With_Held_Student_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                Terms_CBox.Visible = false;
                HMonth_CBox.Visible = false;
                VMonth_CBox.Visible = false;
                Print_Btn.Enabled = false;
                fill_AYear_CBox();
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
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }


        private void School_Bill_RBtn_CheckedChanged(object sender, EventArgs e)
        {
            if (School_Bill_RBtn.Checked)
            {
                Terms_CBox.Visible = true;
                Terms_CBox.Focus();
            }
            else
            {
                Terms_CBox.Visible = false;
            }
        }

        private void Hostel_Bill_RBtn_CheckedChanged(object sender, EventArgs e)
        {
            if (Hostel_Bill_RBtn.Checked)
            {
                HMonth_CBox.Visible = true;
                HMonth_CBox.Focus();
            }
            else
            {
                HMonth_CBox.Visible = false;
            }
        }

        private void Van_Bill_RBtn_CheckedChanged(object sender, EventArgs e)
        {
            if (Van_Bill_RBtn.Checked)
            {
                VMonth_CBox.Visible = true;
                VMonth_CBox.Focus();
            }
            else
            {
                VMonth_CBox.Visible = false;
            }
        }

        private void Print_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (School_Bill_RBtn.Checked)
                {
                    query = "select S.Admission_No,S.Std_Name,S.Class,S.Section from Student_Admission_Master_Table S where S.Admission_No not in(select B.Admission_No from School_Bill_Master_Table B where B.Term_Type='" + Terms_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender,S.Std_Name Asc";
                    DataSet1 ds = new DataSet1();
                    SqlDataAdapter da = new SqlDataAdapter(query, con);
                    con.Open();
                    da.Fill(ds, "School_Fees_Not_Paid_Table");
                    con.Close();
                    CrystalReportOSFR obj = new CrystalReportOSFR();
                    obj.SetDataSource(ds.Tables["School_Fees_Not_Paid_Table"]);

                    ReportDocument crReportDocument;
                    crReportDocument = new ReportDocument();
                    crReportDocument = obj;
                    obj.Refresh();

                    System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                    crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                    crReportDocument.PrintToPrinter(1, true, 0, 0);

                    MessageBox.Show("Report Printed.", "Message");
                }
                else if (Hostel_Bill_RBtn.Checked)
                {
                    query = "select S.Admission_No,S.Std_Name,S.Class,S.Section from Student_Admission_Master_Table S where S.Accomm_Type='" + Accomm_Type + "' and S.Admission_No not in(select B.Admission_No from Hostel_Bill_Master_Table B where B.Month='" + HMonth_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender,S.Std_Name Asc";
                    DataSet1 ds = new DataSet1();
                    SqlDataAdapter da = new SqlDataAdapter(query, con);
                    con.Open();
                    da.Fill(ds, "Hostel_Fees_Not_Paid_Table");
                    con.Close();
                    CrystalReportOHFR obj = new CrystalReportOHFR();
                    obj.SetDataSource(ds.Tables["Hostel_Fees_Not_Paid_Table"]);

                    ReportDocument crReportDocument;
                    crReportDocument = new ReportDocument();
                    crReportDocument = obj;
                    obj.Refresh();

                    System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                    crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                    crReportDocument.PrintToPrinter(1, true, 0, 0);

                    MessageBox.Show("Report Printed.", "Message");
                }
                else if (Van_Bill_RBtn.Checked)
                {
                    query = "select S.Admission_No,S.Std_Name,S.Class,S.Section from Student_Admission_Master_Table S where S.Van='" + Van + "' and S.Admission_No not in(select B.Admission_No from Van_Bill_Master_Table B where B.Month='" + VMonth_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender,S.Std_Name Asc";
                    DataSet1 ds = new DataSet1();
                    SqlDataAdapter da = new SqlDataAdapter(query, con);
                    con.Open();
                    da.Fill(ds, "Van_Fees_Not_Paid_Table");
                    con.Close();
                    CrystalReportOVFR obj = new CrystalReportOVFR();
                    obj.SetDataSource(ds.Tables["Van_Fees_Not_Paid_Table"]);

                    ReportDocument crReportDocument;
                    crReportDocument = new ReportDocument();
                    crReportDocument = obj;
                    obj.Refresh();

                    System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                    crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                    crReportDocument.PrintToPrinter(1, true, 0, 0);

                    MessageBox.Show("Report Printed.", "Message");
                }
                else if (Stationary_RBtn.Checked)
                {
                    query = "select S.Admission_No,S.Std_Name,S.Class,S.Section from Student_Admission_Master_Table S where S.Admission_No not in(select B.Admission_No from Stationary_Bill_Master_Table B where B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class asc";
                    DataSet1 ds = new DataSet1();
                    SqlDataAdapter da = new SqlDataAdapter(query, con);
                    con.Open();
                    da.Fill(ds, "Stationary_Fees_Not_Paid_Table");
                    con.Close();
                    CrystalReportOSTFR obj = new CrystalReportOSTFR();
                    obj.SetDataSource(ds.Tables["Stationary_Fees_Not_Paid_Table"]);

                    ReportDocument crReportDocument;
                    crReportDocument = new ReportDocument();
                    crReportDocument = obj;
                    obj.Refresh();

                    System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                    crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                    crReportDocument.PrintToPrinter(1, true, 0, 0);

                    MessageBox.Show("Report Printed.", "Message");
                }

                else
                {
                    MessageBox.Show("Plz Choose Any Bill Type");
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Fees_Pending_Student_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void Terms_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Terms_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
                }
            }
        }

        private void HMonth_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (HMonth_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
                }
            }
        }

        private void VMonth_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (VMonth_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
                }
            }
        }

        private void Stationary_RBtn_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                View_Btn.Focus();
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
    }
}
