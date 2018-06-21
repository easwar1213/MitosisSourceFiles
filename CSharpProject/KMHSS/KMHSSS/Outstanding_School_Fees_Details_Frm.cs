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
    public partial class Outstanding_School_Fees_Details_Frm : Form
    {
        string query,Exemp="NO";
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Outstanding_School_Fees_Details_Frm()
        {
            InitializeComponent();
        }

        private void School_Fees_Not_Paid_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                AYear_CHBox.Checked = true;
                STerm_CHBox.Checked = true;
                fill_Terms_CBox();
                fill_Class_CBox();
                fill_AYear_CBox();
                Terms_CBox.Focus();
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


        public void fill_Terms_CBox()
        {
            try
            {
                Terms_CBox.Items.Clear();
                query = "select distinct(Term_Type) from School_Fees_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Terms_CBox.Items.Add(dr["Term_Type"].ToString());
                    STerms_CBox.Items.Add(dr["Term_Type"].ToString());
                    ETerms_CBox.Items.Add(dr["Term_Type"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ALFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Class='" + Class_CBox.Text + "' and S.Section='" + Sec_CBox.Text + "' and S.STerm='" + STerms_CBox.Text + "' and S.ETerm='" + ETerms_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from School_Bill_Master_Table B where B.Term_Type='" + Terms_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Outstanding_School_Fees_Details_dataGridView1.DataSource = dt;
                Outstanding_School_Fees_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Outstanding_School_Fees_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Outstanding_School_Fees_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Outstanding_School_Fees_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Outstanding_School_Fees_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Outstanding_School_Fees_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Outstanding_School_Fees_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Outstanding_School_Fees_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Outstanding_School_Fees_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Outstanding_School_Fees_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Outstanding_School_Fees_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Outstanding_School_Fees_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Outstanding_School_Fees_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Outstanding_School_Fees_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Outstanding_School_Fees_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Outstanding_School_Fees_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Outstanding_School_Fees_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Outstanding_School_Fees_Details_dataGridView1.Columns[18].HeaderText = "Concession";                
                Outstanding_School_Fees_Details_dataGridView1.Columns[1].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[2].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[3].Width = 350;
                Outstanding_School_Fees_Details_dataGridView1.Columns[4].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[5].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[6].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[7].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[8].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[9].Width = 330;
                Outstanding_School_Fees_Details_dataGridView1.Columns[10].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[11].Width = 200;
                Outstanding_School_Fees_Details_dataGridView1.Columns[12].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[13].Width = 330;
                Outstanding_School_Fees_Details_dataGridView1.Columns[14].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[15].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[16].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[17].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[18].Width = 200;                
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
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Class='" + Class_CBox.Text + "' and S.STerm='" + STerms_CBox.Text + "' and S.ETerm='" + ETerms_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from School_Bill_Master_Table B where B.Term_Type='" + Terms_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Outstanding_School_Fees_Details_dataGridView1.DataSource = dt;
                Outstanding_School_Fees_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Outstanding_School_Fees_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Outstanding_School_Fees_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Outstanding_School_Fees_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Outstanding_School_Fees_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Outstanding_School_Fees_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Outstanding_School_Fees_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Outstanding_School_Fees_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Outstanding_School_Fees_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Outstanding_School_Fees_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Outstanding_School_Fees_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Outstanding_School_Fees_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Outstanding_School_Fees_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Outstanding_School_Fees_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Outstanding_School_Fees_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Outstanding_School_Fees_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Outstanding_School_Fees_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Outstanding_School_Fees_Details_dataGridView1.Columns[18].HeaderText = "Concession";                
                Outstanding_School_Fees_Details_dataGridView1.Columns[1].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[2].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[3].Width = 350;
                Outstanding_School_Fees_Details_dataGridView1.Columns[4].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[5].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[6].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[7].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[8].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[9].Width = 330;
                Outstanding_School_Fees_Details_dataGridView1.Columns[10].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[11].Width = 200;
                Outstanding_School_Fees_Details_dataGridView1.Columns[12].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[13].Width = 330;
                Outstanding_School_Fees_Details_dataGridView1.Columns[14].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[15].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[16].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[17].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[18].Width = 200;                
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
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.STerm='" + STerms_CBox.Text + "' and S.ETerm='" + ETerms_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from School_Bill_Master_Table B where B.Term_Type='" + Terms_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Outstanding_School_Fees_Details_dataGridView1.DataSource = dt;
                Outstanding_School_Fees_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Outstanding_School_Fees_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Outstanding_School_Fees_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Outstanding_School_Fees_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Outstanding_School_Fees_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Outstanding_School_Fees_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Outstanding_School_Fees_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Outstanding_School_Fees_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Outstanding_School_Fees_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Outstanding_School_Fees_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Outstanding_School_Fees_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Outstanding_School_Fees_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Outstanding_School_Fees_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Outstanding_School_Fees_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Outstanding_School_Fees_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Outstanding_School_Fees_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Outstanding_School_Fees_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Outstanding_School_Fees_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Outstanding_School_Fees_Details_dataGridView1.Columns[1].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[2].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[3].Width = 350;
                Outstanding_School_Fees_Details_dataGridView1.Columns[4].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[5].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[6].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[7].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[8].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[9].Width = 330;
                Outstanding_School_Fees_Details_dataGridView1.Columns[10].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[11].Width = 200;
                Outstanding_School_Fees_Details_dataGridView1.Columns[12].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[13].Width = 330;
                Outstanding_School_Fees_Details_dataGridView1.Columns[14].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[15].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[16].Width = 150;
                Outstanding_School_Fees_Details_dataGridView1.Columns[17].Width = 120;
                Outstanding_School_Fees_Details_dataGridView1.Columns[18].Width = 200;                
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PALFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Class='" + Class_CBox.Text + "' and S.Section='" + Sec_CBox.Text + "' and S.STerm='" + STerms_CBox.Text + "' and S.ETerm='" + ETerms_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from School_Bill_Master_Table B where B.Term_Type='" + Terms_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportOSFR obj = new CrystalReportOSFR();
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
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Class='" + Class_CBox.Text + "' and S.STerm='" + STerms_CBox.Text + "' and S.ETerm='" + ETerms_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from School_Bill_Master_Table B where B.Term_Type='" + Terms_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportOSFR obj = new CrystalReportOSFR();
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
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.STerm='" + STerms_CBox.Text + "' and S.ETerm='" + ETerms_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from School_Bill_Master_Table B where B.Term_Type='" + Terms_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportOSFR obj = new CrystalReportOSFR();
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

        private void STerm_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            STerms_CBox.Focus();
        }

        private void ETerm_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            
        }

        private void Terms_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Terms_CBox.Focus();
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
        }

        private void Outstanding_School_Fees_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                try
                {
                    if (STerms_CBox.Text != "" && ETerms_CBox.Text != "" && Terms_CBox.Text != "")
                    {
                        if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && STerm_CHBox.Checked == true && Terms_CHBox.Checked == true)
                        {
                            ALFill_Grid();
                            SYear_CBox.Focus();
                        }
                        else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && STerm_CHBox.Checked == true && Terms_CHBox.Checked == true)
                        {
                            ACFill_Grid();
                            SYear_CBox.Focus();
                        }
                        else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && STerm_CHBox.Checked == true && Terms_CHBox.Checked == true)
                        {
                            AFill_Grid();
                            SYear_CBox.Focus();
                        }
                    }
                    else
                    {
                        MessageBox.Show("Please Select Starting & Ending Terms");
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
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
                try
                {
                    if (STerms_CBox.Text != "" && ETerms_CBox.Text != "" && Terms_CBox.Text != "")
                    {
                        if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && STerm_CHBox.Checked == true && Terms_CHBox.Checked == true)
                        {
                            PALFill_Grid();
                            SYear_CBox.Focus();
                        }
                        else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && STerm_CHBox.Checked == true && Terms_CHBox.Checked == true)
                        {
                            PACFill_Grid();
                            SYear_CBox.Focus();
                        }
                        else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && STerm_CHBox.Checked == true && Terms_CHBox.Checked == true)
                        {
                            PAFill_Grid();
                            SYear_CBox.Focus();
                        }
                    }
                    else
                    {
                        MessageBox.Show("Please Select Starting & Ending Terms");
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        
    }
}
