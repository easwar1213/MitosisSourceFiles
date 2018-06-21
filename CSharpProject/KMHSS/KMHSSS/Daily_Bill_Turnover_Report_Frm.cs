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
    public partial class Daily_Bill_Turnover_Report_Frm : Form
    {
        string query;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Daily_Bill_Turnover_Report_Frm()
        {
            InitializeComponent();
        }       

        private void Daily_Bill_Turnover_Report_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                Date_Dtp.Value = DateTime.Now;
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

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                query = "select N.Description,N.Total as Amount,D.Bill_Date,D.Total from Net_Amount_Table N,Daily_Turn_Over_Table D where N.Bill_Date=D.Bill_Date and N.Bill_Date='"+Date_Dtp.Text+"'";
                DataSet1 ds = new DataSet1();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Daily_Net_Bill_Table");
                con.Close();
                CrystalReportDBTR obj = new CrystalReportDBTR();
                obj.SetDataSource(ds.Tables["Daily_Net_Bill_Table"]);
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
