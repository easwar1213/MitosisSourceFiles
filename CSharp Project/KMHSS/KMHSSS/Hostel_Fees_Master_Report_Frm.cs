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
    public partial class Hostel_Fees_Master_Report_Frm : Form
    {
        string query;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Hostel_Fees_Master_Report_Frm()
        {
            InitializeComponent();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                query = "select * from Hostel_Fees_Master_Table";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Hostel_Fees_Master_Table");
                con.Close();
                CrystalReportHFR obj = new CrystalReportHFR();
                obj.SetDataSource(ds.Tables["Hostel_Fees_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }  
        }
    }
}
