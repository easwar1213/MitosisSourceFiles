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
    public partial class Class_Name_List_Frm : Form
    {
        string query;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Class_Name_List_Frm()
        {
            InitializeComponent();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true)
                {
                    if (SYear_CBox.Text != "" && EYear_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "")
                    {
                        CFill_Grid();
                        SYear_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Academy Year and Class and Section");
                    }
                }
                else if (AYear_CHBox.Checked == true)
                {
                    if (SYear_CBox.Text != "" && EYear_Txt.Text != "")
                    {
                        AFill_Grid();
                        SYear_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Academy Year");
                    }
                }
                else if (Class_CHBox.Checked == true)
                {
                    if (Class_CBox.Text != "" && Sec_CBox.Text != "")
                    {
                        ACFill_Grid();
                        SYear_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Academy Year");
                    }
                }
                else
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

        public void AFill_Grid()
        {
            try
            {
                query = "select Admission_No,Std_Name,Class,Section,Group_Code from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Class_Name_List_dataGridView1.DataSource = dt;
                Class_Name_List_dataGridView1.Columns[1].HeaderText = "Admis No";
                Class_Name_List_dataGridView1.Columns[2].HeaderText = "Student Name";
                Class_Name_List_dataGridView1.Columns[3].HeaderText = "Class";
                Class_Name_List_dataGridView1.Columns[4].HeaderText = "Section";
                Class_Name_List_dataGridView1.Columns[5].HeaderText = "Group Code";
                Class_Name_List_dataGridView1.Columns[1].Width = 120;
                Class_Name_List_dataGridView1.Columns[2].Width = 350;
                Class_Name_List_dataGridView1.Columns[3].Width = 120;
                Class_Name_List_dataGridView1.Columns[4].Width = 120;
                Class_Name_List_dataGridView1.Columns[5].Width = 200;
                Class_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }  
        }

        public void CFill_Grid()
        {
            try
            {
                query = "select Admission_No,Std_Name,Class,Section,Group_Code from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Class_Name_List_dataGridView1.DataSource = dt;
                Class_Name_List_dataGridView1.Columns[1].HeaderText = "Admis No";
                Class_Name_List_dataGridView1.Columns[2].HeaderText = "Student Name";
                Class_Name_List_dataGridView1.Columns[3].HeaderText = "Class";
                Class_Name_List_dataGridView1.Columns[4].HeaderText = "Section";
                Class_Name_List_dataGridView1.Columns[5].HeaderText = "Group Code";
                Class_Name_List_dataGridView1.Columns[1].Width = 120;
                Class_Name_List_dataGridView1.Columns[2].Width = 350;
                Class_Name_List_dataGridView1.Columns[3].Width = 120;
                Class_Name_List_dataGridView1.Columns[4].Width = 120;
                Class_Name_List_dataGridView1.Columns[5].Width = 200;
                Class_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }
        }

        public void ACFill_Grid()
        {
            try
            {
                query = "select Admission_No,Std_Name,Class,Section,Group_Code from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Class_Name_List_dataGridView1.DataSource = dt;
                Class_Name_List_dataGridView1.Columns[1].HeaderText = "Admis No";
                Class_Name_List_dataGridView1.Columns[2].HeaderText = "Student Name";
                Class_Name_List_dataGridView1.Columns[3].HeaderText = "Class";
                Class_Name_List_dataGridView1.Columns[4].HeaderText = "Section";
                Class_Name_List_dataGridView1.Columns[5].HeaderText = "Group Code";
                Class_Name_List_dataGridView1.Columns[1].Width = 120;
                Class_Name_List_dataGridView1.Columns[2].Width = 350;
                Class_Name_List_dataGridView1.Columns[3].Width = 120;
                Class_Name_List_dataGridView1.Columns[4].Width = 120;
                Class_Name_List_dataGridView1.Columns[5].Width = 200;
                Class_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }
        }       

        private void Class_Name_List_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                Class_CBox.Focus();
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

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
        }

        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Sec_CBox.Focus();
                }
            }
        }

        private void Sec_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Sec_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
                }
            }
        }

        private void Class_Name_List_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void Print_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true)
                {
                    if (SYear_CBox.Text != "" && EYear_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "")
                    {
                        CPrint();
                        SYear_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Academy Year and Class and Section");
                    }
                }
                else if (AYear_CHBox.Checked == true)
                {
                    if (SYear_CBox.Text != "" && EYear_Txt.Text != "")
                    {
                        APrint();
                        SYear_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Academy Year");
                    }
                }
                else if (Class_CHBox.Checked == true)
                {
                    if (Class_CBox.Text != "" && Sec_CBox.Text != "")
                    {
                        ACPrint();
                        SYear_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Academy Year");
                    }
                }
                else
                {
                    APrint();
                    SYear_CBox.Focus();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void APrint()
        {
            try
            {
                query = "select Admission_No,Std_Name,Class,Section,Group_Code from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' order by Class,Section,Gender,Std_Name Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Personal_Details_Master_Table");
                con.Close();
                CrystalReportCNLR obj = new CrystalReportCNLR();
                obj.SetDataSource(ds.Tables["Student_Personal_Details_Master_Table"]);

                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                SYear_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }  
        }

        public void CPrint()
        {
            try
            {
                query = "select Admission_No,Std_Name,Class,Section,Group_Code from Student_Admission_Master_Table where SYear='"+SYear_CBox.Text+"' and EYear='"+EYear_Txt.Text+"' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' order by Class,Section,Gender,Std_Name Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Personal_Details_Master_Table");
                con.Close();
                CrystalReportCNLR obj = new CrystalReportCNLR();
                obj.SetDataSource(ds.Tables["Student_Personal_Details_Master_Table"]);

                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                SYear_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }
        }


        public void ACPrint()
        {
            try
            {
                query = "select Admission_No,Std_Name,Class,Section,Group_Code from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' order by Class,Section,Gender,Std_Name Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Personal_Details_Master_Table");
                con.Close();
                CrystalReportCNLR obj = new CrystalReportCNLR();
                obj.SetDataSource(ds.Tables["Student_Personal_Details_Master_Table"]);

                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                SYear_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
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
            if (AYear_CHBox.Checked == true)
            {
                SYear_CBox.Focus();
            }
        }

        private void Class_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            if (Class_CHBox.Checked == true)
            {
                Class_CBox.Focus();
            }
        }

    }
}
