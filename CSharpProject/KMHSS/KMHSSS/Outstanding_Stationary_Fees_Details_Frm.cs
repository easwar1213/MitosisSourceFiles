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
    public partial class Outstanding_Stationary_Fees_Details_Frm : Form
    {
        string query, Type = "School", Exemp = "NO";
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Outstanding_Stationary_Fees_Details_Frm()
        {
            InitializeComponent();
        }

        private void Outstanding_Stationary_Fees_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                fill_Particulars_CBox();
                AYear_CHBox.Checked = true;
                SYear_CBox.Focus();
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
                query = "select distinct(SYear) from Academy_Year_Master_Table";
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

        public void ALSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Class='" + Class_CBox.Text + "' and S.Section='" + Sec_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from Stationary_Bill_Master_Table B where B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Outstanding_Stationary_Fees_Details_dataGridView1.DataSource = dt;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].Width = 350;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].Width = 200;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Class='" + Class_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from Stationary_Bill_Master_Table B where B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Outstanding_Stationary_Fees_Details_dataGridView1.DataSource = dt;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].Width = 350;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].Width = 200;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
       
        public void ASFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from Stationary_Bill_Master_Table B where B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Outstanding_Stationary_Fees_Details_dataGridView1.DataSource = dt;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].Width = 350;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].Width = 200;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ALPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table A,Stationary_Bill_Master_Table S where A.Admission_No=S.Admission_No and S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' and A.Section='" + Sec_CBox.Text + "' and S.SBill_No in(select B.SBill_No from Stationary_Bill_Sub_Master_Table B where B.Particulars='BELT') order by S.Class,S.Section Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Outstanding_Stationary_Fees_Details_dataGridView1.DataSource = dt;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].Width = 350;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].Width = 200;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table A,Stationary_Bill_Master_Table S where A.Admission_No=S.Admission_No and S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' and S.SBill_No in(select B.SBill_No from Stationary_Bill_Sub_Master_Table B where B.Particulars='BELT') order by S.Class,S.Section Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Outstanding_Stationary_Fees_Details_dataGridView1.DataSource = dt;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].Width = 350;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].Width = 200;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        
        public void APFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table A,Stationary_Bill_Master_Table S where A.Admission_No=S.Admission_No and S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.SBill_No in(select B.SBill_No from Stationary_Bill_Sub_Master_Table B where B.Particulars='BELT') order by S.Class,S.Section Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Outstanding_Stationary_Fees_Details_dataGridView1.DataSource = dt;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[1].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[2].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[3].Width = 350;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[4].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[5].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[6].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[7].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[8].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[9].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[10].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[11].Width = 200;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[12].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[13].Width = 330;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[14].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[15].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[16].Width = 150;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[17].Width = 120;
                Outstanding_Stationary_Fees_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PALSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Class='" + Class_CBox.Text + "' and S.Section='" + Sec_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from Stationary_Bill_Master_Table B where B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportOSTFR obj = new CrystalReportOSTFR();
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

        public void PACSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Class='" + Class_CBox.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from Stationary_Bill_Master_Table B where B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportOSTFR obj = new CrystalReportOSTFR();
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

        public void PASFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table S where S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.Exemption='" + Exemp + "' and S.Admission_No not in(select B.Admission_No from Stationary_Bill_Master_Table B where B.SYear='" + SYear_CBox.Text + "' and B.EYear='" + EYear_Txt.Text + "') order by S.Class,S.Section,S.Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportOSTFR obj = new CrystalReportOSTFR();
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

        public void PALPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table A,Stationary_Bill_Master_Table S where A.Admission_No=S.Admission_No and S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' and A.Section='" + Sec_CBox.Text + "' and S.SBill_No in(select B.SBill_No from Stationary_Bill_Sub_Master_Table B where B.Particulars='BELT') order by S.Class,S.Section Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportPPD obj = new CrystalReportPPD();
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

        public void PACPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table A,Stationary_Bill_Master_Table S where A.Admission_No=S.Admission_No and S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' and S.SBill_No in(select B.SBill_No from Stationary_Bill_Sub_Master_Table B where B.Particulars='BELT') order by S.Class,S.Section Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportPPD obj = new CrystalReportPPD();
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

        public void PAPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table A,Stationary_Bill_Master_Table S where A.Admission_No=S.Admission_No and S.SYear='" + SYear_CBox.Text + "' and S.EYear='" + EYear_Txt.Text + "' and S.SBill_No in(select B.SBill_No from Stationary_Bill_Sub_Master_Table B where B.Particulars='BELT') order by S.Class,S.Section Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportPPD obj = new CrystalReportPPD();
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
                fill_Particulars_CBox();
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

        private void Particulars_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Particulars_CBox.Focus();
        }

        private void Outstanding_Stationary_Fees_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void Stationary_Fees_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            View_Btn.Focus();
        }

        private void Sec_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {

        }      

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Stationary_Fees_CHBox.Checked == true && Particulars_CHBox.Checked == false)
                {
                    ALSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Stationary_Fees_CHBox.Checked == true && Particulars_CHBox.Checked == false)
                {
                    ACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Stationary_Fees_CHBox.Checked == true && Particulars_CHBox.Checked == false)
                {
                    ASFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Stationary_Fees_CHBox.Checked == false && Particulars_CHBox.Checked == true)
                {
                    ALPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Stationary_Fees_CHBox.Checked == false && Particulars_CHBox.Checked == true)
                {
                    ACPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Stationary_Fees_CHBox.Checked == false && Particulars_CHBox.Checked == true)
                {
                    APFill_Grid();
                    SYear_CBox.Focus();
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
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Stationary_Fees_CHBox.Checked == true && Particulars_CHBox.Checked == false)
                {
                    PALSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Stationary_Fees_CHBox.Checked == true && Particulars_CHBox.Checked == false)
                {
                    PACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Stationary_Fees_CHBox.Checked == true && Particulars_CHBox.Checked == false)
                {
                    PASFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Stationary_Fees_CHBox.Checked == false && Particulars_CHBox.Checked == true)
                {
                    PALPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Stationary_Fees_CHBox.Checked == false && Particulars_CHBox.Checked == true)
                {
                    PACPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Stationary_Fees_CHBox.Checked == false && Particulars_CHBox.Checked == true)
                {
                    PAPFill_Grid();
                    SYear_CBox.Focus();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }        
    }
}
