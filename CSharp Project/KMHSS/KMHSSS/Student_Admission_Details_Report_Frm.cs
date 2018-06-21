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
    public partial class Student_Admission_Details_Report_Frm : Form
    {
        string query, Accommh = "Hostel", Van = "YES", Accommd = "DAYS SCHOLAR";
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Student_Admission_Details_Report_Frm()
        {
            InitializeComponent();
        }

        private void Student_Admission_Details_Report_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                Frm_Admis_Date_Dtp.Value = DateTime.Now;
                To_Admis_Date_Dtp.Value = DateTime.Now;
                fill_Class_CBox();
                fill_AYear_CBox();
                SYear_CBox.Focus();
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

        public void ACSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSDTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Admis_Date between '" + Frm_Admis_Date_Dtp.Text + "' and '" + To_Admis_Date_Dtp.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACDTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Admis_Date between '" + Frm_Admis_Date_Dtp.Text + "' and '" + To_Admis_Date_Dtp.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ADTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Admis_Date between '" + Frm_Admis_Date_Dtp.Text + "' and '" + To_Admis_Date_Dtp.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ADFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='" + Accommd + "' and Van!='" + Van + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AHFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='" + Accommh + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSDFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accommd + "' and Van!='" + Van + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSHFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accommh + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                crystalReportViewer1.ReportSource = obj;
                obj.Refresh();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
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

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
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

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    ACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    ACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    AFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == true && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    ACSHFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == true && Van_CHBox.Checked == true && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    ACSVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == true && Date_CHBox.Checked == false)
                {
                    ACSDFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    ACSDTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    ACDTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    ADTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == true && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    AHFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == true && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    AVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == true && Date_CHBox.Checked == false)
                {
                    ADFill_Grid();
                    SYear_CBox.Focus();
                }
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

            
    }
}
