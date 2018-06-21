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
    public partial class Particulars_Fees_Paid_Details_Frm : Form
    {
        string query,Type = "School";
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Particulars_Fees_Paid_Details_Frm()
        {
            InitializeComponent();
        }

        private void Karathe_Yoha_Fees_Paid_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {                
                Print_Btn.Enabled = false;
                fill_AYear_CBox();
                Particulars_CBox.Focus();
                fill_Particulars_CBox();
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

        public void fill_Particulars_CBox()
        {
            try
            {
                Particulars_CBox.Items.Clear();
                query = "select distinct(Particulars) from Other_Fees_Master_Table where Type='" + Type + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Particulars_CBox.Items.Add(dr["Particulars"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void KDFill_Grid()
        {
            try
            {
                query = "select S.Admission_No,S.Std_Name,S.Class,S.Section from Stationary_Bill_Master_Table S where S.SBill_No in(select B.SBill_No from Stationary_Bill_Sub_Master_Table B where B.Particulars='" + Particulars_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Karathe_Yoha_Fees_Paid_Details_dataGridView1.DataSource = dt;
                Karathe_Yoha_Fees_Paid_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Karathe_Yoha_Fees_Paid_Details_dataGridView1.Columns[2].HeaderText = "Student Name";
                Karathe_Yoha_Fees_Paid_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Karathe_Yoha_Fees_Paid_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Karathe_Yoha_Fees_Paid_Details_dataGridView1.Columns[1].Width = 120;
                Karathe_Yoha_Fees_Paid_Details_dataGridView1.Columns[2].Width = 350;
                Karathe_Yoha_Fees_Paid_Details_dataGridView1.Columns[3].Width = 120;
                Karathe_Yoha_Fees_Paid_Details_dataGridView1.Columns[4].Width = 120;
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
                if (Particulars_CBox.Text != "")
                {
                    KDFill_Grid();
                    Print_Btn.Enabled = true;
                    Particulars_CBox.Focus();
                }
                else
                {
                    MessageBox.Show("Plz Choose Any Particulars");
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Print_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                query = "select row_number() over(order by S.Class) as SNo,S.Admission_No,S.Std_Name,S.Class,S.Section from Stationary_Bill_Master_Table S where S.SBill_No in(select B.SBill_No from Stationary_Bill_Sub_Master_Table B where B.Particulars='" + Particulars_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Std_Name Asc";
                    DataSet1 ds = new DataSet1();
                    SqlDataAdapter da = new SqlDataAdapter(query, con);
                    con.Open();
                    da.Fill(ds, "Stationary_Paid_Net_Bill_Table");
                    con.Close();
                    CrystalReportPPD obj = new CrystalReportPPD();
                    obj.SetDataSource(ds.Tables["Stationary_Paid_Net_Bill_Table"]);

                    ReportDocument crReportDocument;
                    crReportDocument = new ReportDocument();
                    crReportDocument = obj;
                    obj.Refresh();

                    System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                    crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                    crReportDocument.PrintToPrinter(1, true, 0, 0);

                    //MessageBox.Show("Report Printed.", "Message");
               
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Particulars_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Particulars_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
                }
            }
        }

        private void Karathe_Yoha_Fees_Paid_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
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
