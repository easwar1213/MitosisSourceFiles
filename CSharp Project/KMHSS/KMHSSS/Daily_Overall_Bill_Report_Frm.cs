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
    public partial class Daily_Overall_Bill_Report_Frm : Form
    {
        string query;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Daily_Overall_Bill_Report_Frm()
        {
            InitializeComponent();
        }

        private void Daily_Overall_Bill_Report_Frm_Load(object sender, EventArgs e)
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
                query = "select Bill_No,Bill_Date,Admission_No,Std_Name,Class,Section,Description,Total as Amount,sum(Total) over() as Total from Daily_Net_Amount_Master_Table D where D.Bill_Date between '" + From_Date_Dtp.Text+ "' and '" + To_Date_Dtp.Text + "' order by D.Bill_No,D.Description asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Daily_Net_Bill_Amunt_Table");
                con.Close();
                CrystalReportDOBR obj = new CrystalReportDOBR();
                obj.SetDataSource(ds.Tables["Daily_Net_Bill_Amunt_Table"]);
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
