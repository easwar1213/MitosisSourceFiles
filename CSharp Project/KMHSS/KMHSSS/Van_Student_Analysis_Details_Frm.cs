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
    public partial class Van_Student_Analysis_Details_Frm : Form
    {
        string query, Van = "YES";
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Van_Student_Analysis_Details_Frm()
        {
            InitializeComponent();
        }       

        private void Van_Student_Analysis_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                fill_Place_CBox();
                fill_Trip_Type_CBox();
                fill_Van_No_CBox();
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

        public void fill_Trip_Type_CBox()
        {
            try
            {
                Trip_Type_CBox.Items.Clear();
                query = "select distinct(Trip_Type) from Trip_Type_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Trip_Type_CBox.Items.Add(dr["Trip_Type"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }        

        public void fill_Place_CBox()
        {
            try
            {
                Place_CBox.Items.Clear();
                query = "select distinct(Place) from Place_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Place_CBox.Items.Add(dr["Place"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Van_No_CBox()
        {
            try
            {
                Van_Number_CBox.Items.Clear();
                query = "select Van_Number from Van_Number_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Van_Number_CBox.Items.Add(dr["Van_Number"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ALFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='"+Van+"' and SMonth='" + SMonth_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Trip_Type='"+Trip_Type_CBox.Text+"' and Van_Number='"+Van_Number_CBox.Text+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSMPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' and SMonth='" + SMonth_CBox.Text + "' and Place='" + Place_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void CFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void CSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void MFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Van='" + Van + "' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void PFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Van='" + Van + "'and Place='" + Place_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void TFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Van='" + Van + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "'and Place='" + Place_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ATFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AMPTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and SMonth='" + SMonth_CBox.Text + "' and Van='" + Van + "' and Place='" + Place_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void APTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Place='" + Place_CBox.Text + "' and Van='" + Van + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AMPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and SMonth='" + SMonth_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Van='"+Van+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AMTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and SMonth='" + SMonth_CBox.Text + "' and Van='"+Van+"' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='"+Class_CBox.Text+"' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Section='"+Sec_CBox.Text+"' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSPVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Place='"+Place_CBox.Text+"' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACPVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void APVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Place='" + Place_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSPTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Trip_Type='"+Trip_Type_CBox.Text+"' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ATVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }        

        public void ACPTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void APTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Place='" + Place_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Van_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Van_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Van_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Van_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Van_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Van_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Van_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Van_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Van_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Van_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Van_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Van_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Van Number";
                Van_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "Main Type";
                Van_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "SMonth";
                Van_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "STerm";
                Van_Student_Analysis_Details_dataGridView1.Columns[19].HeaderText = "Concession";
                Van_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Van_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Van_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Van_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[17].Width = 150;
                Van_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
                Van_Student_Analysis_Details_dataGridView1.Columns[19].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PALFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' and SMonth='" + SMonth_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACSMPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' and SMonth='" + SMonth_CBox.Text + "' and Place='" + Place_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACSMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PAFill_Grid()
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

        public void PCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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
        public void PCSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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
        public void PMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Van='" + Van + "' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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
        public void PPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Van='" + Van + "'and Place='" + Place_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Van='" + Van + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PAMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "'and Place='" + Place_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PATFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PAMPTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and SMonth='" + SMonth_CBox.Text + "' and Van='" + Van + "' and Place='" + Place_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PAPTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Place='" + Place_CBox.Text + "' and Van='" + Van + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PAMPFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and SMonth='" + SMonth_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PAMTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and SMonth='" + SMonth_CBox.Text + "' and Van='" + Van + "' and Trip_Type='" + Trip_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PAVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='"+Class_CBox.Text+"' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACSVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Section='"+Sec_CBox.Text+"' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACSPVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Place='"+Place_CBox.Text+"' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACPVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PAPVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Place='" + Place_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACSPTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Trip_Type='"+Trip_Type_CBox.Text+"' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACSTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PATVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PACPTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Class='" + Class_CBox.Text + "' and Place='" + Place_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        public void PAPTVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' and Place='" + Place_CBox.Text + "' and Trip_Type='" + Trip_Type_CBox.Text + "' and Van_Number='" + Van_Number_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
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

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    ALFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    ACSMPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    ACSMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    ACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    ACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    AFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    AMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    APFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    ATFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    AMPTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    APTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    AMPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    AMTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    CSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    CFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    MFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    TFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked==true)
                {
                    AVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    ACVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    ACSVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    ACSPVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    ACPVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    APVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    ACSPTVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    ACSTVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    ACTVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    ATVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    ACPTVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    APTVFill_Grid();
                    SYear_CBox.Focus();
                }
                
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

        private void Van_Student_Analysis_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Print_Lbl_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    PALFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PACSMPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PACSMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PAFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PAMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PAPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    PATFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    PAMPTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    PAPTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PAMPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    PAMTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PCSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PCFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == false)
                {
                    PPFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == false)
                {
                    PTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    PAVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    PACVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    PACSVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    PACSPVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    PACPVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == false && Van_No_CHBox.Checked == true)
                {
                    PAPVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    PACSPTVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    PACSTVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    PACTVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == false && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    PATVFill_Grid();
                    SYear_CBox.Focus();
                }                
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    PACPTVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Place_CHBox.Checked == true && Trip_CHBox.Checked == true && Van_No_CHBox.Checked == true)
                {
                    PAPTVFill_Grid();
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
