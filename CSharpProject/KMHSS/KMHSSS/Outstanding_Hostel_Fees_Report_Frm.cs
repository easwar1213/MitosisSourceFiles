using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace KMHSSS
{
    public partial class Outstanding_Hostel_Fees_Report_Frm : Form
    {
        string query, Accomm_Type = "Hostel";
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Outstanding_Hostel_Fees_Report_Frm()
        {
            InitializeComponent();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (Month_CBox.Text != "")
                {
                    query = "select S.Admission_No,S.Std_Name,S.Class,S.Section,S.SMonth from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.SMonth='" + SMonth_CBox.Text + "' AND S.Accomm_Type='" + Accomm_Type + "' and S.Admission_No not in(select B.Admission_No from Hostel_Bill_Master_Table B where Month='" + Month_CBox.Text + "') order by S.Class,S.Section,S.Gender Asc";               
                    DataSet1 ds = new DataSet1();
                    SqlDataAdapter da = new SqlDataAdapter(query, con);
                    con.Open();
                    da.Fill(ds, "Hostel_Fees_Not_Paid_Table");
                    con.Close();
                    CrystalReportOHFR obj = new CrystalReportOHFR();
                    obj.SetDataSource(ds.Tables["Hostel_Fees_Not_Paid_Table"]);
                    crystalReportViewer1.ReportSource = obj;
                    obj.Refresh();
                    Month_CBox.Focus();
                }
                else
                {
                    MessageBox.Show("Plz Choose Month");
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }  
        }

        private void Outstanding_Hostel_Fees_Report_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_AYear_CBox();
                Month_CBox.Focus();
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


        private void Month_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Month_CBox.Text != "")
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
    }
}
