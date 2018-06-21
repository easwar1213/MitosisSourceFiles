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
    public partial class Hostel_Bill_Report_Frm : Form
    {
        string query;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Hostel_Bill_Report_Frm()
        {
            InitializeComponent();
        }

        private void Hostel_Bill_Report_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                From_Date_Dtp.Value = DateTime.Now;
                To_Date_Dtp.Value = DateTime.Now;
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
                query = "select HBill_No,HBill_Date as Bill_Date,Std_Name,Admission_No,Class,Section,Total as Amount,sum(Total) over() as Total from Hostel_Bill_Master_Table where HBill_Date between '" + From_Date_Dtp.Text + "' and '" + To_Date_Dtp.Text + "'";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Hostel_Net_Bill_Table");
                con.Close();
                CrystalReportHBR obj = new CrystalReportHBR();
                obj.SetDataSource(ds.Tables["Hostel_Net_Bill_Table"]);
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
