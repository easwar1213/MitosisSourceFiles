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
    public partial class Outsatanding_School_Fees_Report_Frm : Form
    {
        string query;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Outsatanding_School_Fees_Report_Frm()
        {
            InitializeComponent();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (Terms_CBox.Text != "")
                {
                    query = "select S.Admission_No,S.Std_Name,S.Class,S.Section,S.STerm from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' AND S.STerm='" + STerms_CBox.Text + "' AND S.Admission_No not in(select B.Admission_No from School_Bill_Master_Table B where B.Term_Type='" + Terms_CBox.Text + "' and B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                    DataSet1 ds = new DataSet1();
                    SqlDataAdapter da = new SqlDataAdapter(query, con);
                    con.Open();
                    da.Fill(ds, "School_Fees_Not_Paid_Table");
                    con.Close();
                    CrystalReportOSFR obj = new CrystalReportOSFR();
                    obj.SetDataSource(ds.Tables["School_Fees_Not_Paid_Table"]);
                    crystalReportViewer1.ReportSource = obj;
                    obj.Refresh();
                    Terms_CBox.Focus();
                }
                else
                {
                    MessageBox.Show("Plz Choose Term Type");
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }  
        }

        private void Outsatanding_School_Fees_Report_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_AYear_CBox();
                fill_Terms_CBox();
                Terms_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
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
                }
                con.Close();
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
    }
}
