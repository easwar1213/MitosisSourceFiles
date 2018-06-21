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
    public partial class Student_Bill_Summary_Details_Frm : Form
    {
        string query;
        int last=0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Student_Bill_Summary_Details_Frm()
        {
            InitializeComponent();
        }

        private void Student_Wise_Bill_History_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
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

        public void Fill_GridS()
        {
            try
            {
                query = "select * from School_Bill_Master_Table where Admission_No='" + Admis_No_Txt.Text + "' and SYear='"+SYear_CBox.Text +"' and EYear='"+EYear_Txt.Text +"'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Bill_Summary_Details_dataGridView1.DataSource = dt;
                Student_Bill_Summary_Details_dataGridView1.Columns[1].HeaderText = "SBill No";
                Student_Bill_Summary_Details_dataGridView1.Columns[2].HeaderText = "Bill Date";
                Student_Bill_Summary_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Student_Bill_Summary_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Student_Bill_Summary_Details_dataGridView1.Columns[5].HeaderText = "Std Name";
                Student_Bill_Summary_Details_dataGridView1.Columns[6].HeaderText = "Admis No";
                Student_Bill_Summary_Details_dataGridView1.Columns[7].HeaderText = "SYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[8].HeaderText = "EYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[9].HeaderText = "Term Type";
                Student_Bill_Summary_Details_dataGridView1.Columns[10].HeaderText = "Term Amt";
                Student_Bill_Summary_Details_dataGridView1.Columns[11].HeaderText = "Fine";
                Student_Bill_Summary_Details_dataGridView1.Columns[12].HeaderText = "Total";
                Student_Bill_Summary_Details_dataGridView1.Columns[1].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[2].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[3].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[4].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[5].Width = 320;
                Student_Bill_Summary_Details_dataGridView1.Columns[6].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[7].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[8].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[9].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[10].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[11].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[12].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_GridH()
        {
            try
            {
                query = "select * from Hostel_Bill_Master_Table where Admission_No='" + Admis_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Bill_Summary_Details_dataGridView1.DataSource = dt;
                Student_Bill_Summary_Details_dataGridView1.Columns[1].HeaderText = "SBill No";
                Student_Bill_Summary_Details_dataGridView1.Columns[2].HeaderText = "Bill Date";
                Student_Bill_Summary_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Student_Bill_Summary_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Student_Bill_Summary_Details_dataGridView1.Columns[5].HeaderText = "Std Name";
                Student_Bill_Summary_Details_dataGridView1.Columns[6].HeaderText = "Admis No";
                Student_Bill_Summary_Details_dataGridView1.Columns[7].HeaderText = "SYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[8].HeaderText = "EYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[9].HeaderText = "SMonth";
                Student_Bill_Summary_Details_dataGridView1.Columns[10].HeaderText = "Month";
                Student_Bill_Summary_Details_dataGridView1.Columns[11].HeaderText = "Hostel Amt";
                Student_Bill_Summary_Details_dataGridView1.Columns[12].HeaderText = "Other Amt";
                Student_Bill_Summary_Details_dataGridView1.Columns[13].HeaderText = "Ded Amt";
                Student_Bill_Summary_Details_dataGridView1.Columns[14].HeaderText = "Total";
                Student_Bill_Summary_Details_dataGridView1.Columns[1].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[2].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[3].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[4].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[5].Width = 320;
                Student_Bill_Summary_Details_dataGridView1.Columns[6].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[7].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[8].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[9].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[10].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[11].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[12].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[13].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[14].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_GridV()
        {
            try
            {
                query = "select * from Van_Bill_Master_Table where Admission_No='" + Admis_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Bill_Summary_Details_dataGridView1.DataSource = dt;
                Student_Bill_Summary_Details_dataGridView1.Columns[1].HeaderText = "SBill No";
                Student_Bill_Summary_Details_dataGridView1.Columns[2].HeaderText = "Bill Date";
                Student_Bill_Summary_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Student_Bill_Summary_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Student_Bill_Summary_Details_dataGridView1.Columns[5].HeaderText = "Std Name";
                Student_Bill_Summary_Details_dataGridView1.Columns[6].HeaderText = "Admis No";
                Student_Bill_Summary_Details_dataGridView1.Columns[7].HeaderText = "SYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[8].HeaderText = "EYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[9].HeaderText = "SMonth";
                Student_Bill_Summary_Details_dataGridView1.Columns[10].HeaderText = "Month";
                Student_Bill_Summary_Details_dataGridView1.Columns[11].HeaderText = "Place";
                Student_Bill_Summary_Details_dataGridView1.Columns[12].HeaderText = "Trip Type";
                Student_Bill_Summary_Details_dataGridView1.Columns[13].HeaderText = "Trip Amt";
                Student_Bill_Summary_Details_dataGridView1.Columns[14].HeaderText = "Total";
                Student_Bill_Summary_Details_dataGridView1.Columns[1].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[2].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[3].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[4].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[5].Width = 320;
                Student_Bill_Summary_Details_dataGridView1.Columns[6].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[7].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[8].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[9].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[10].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[11].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[12].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[13].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[14].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void Fill_GridST()
        {
            try
            {
                query = "select * from Stationary_Bill_Master_Table where Admission_No='" + Admis_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Bill_Summary_Details_dataGridView1.DataSource = dt;
                Student_Bill_Summary_Details_dataGridView1.Columns[1].HeaderText = "SBill No";
                Student_Bill_Summary_Details_dataGridView1.Columns[2].HeaderText = "Bill Date";
                Student_Bill_Summary_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Student_Bill_Summary_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Student_Bill_Summary_Details_dataGridView1.Columns[5].HeaderText = "Std Name";
                Student_Bill_Summary_Details_dataGridView1.Columns[6].HeaderText = "Admis No";
                Student_Bill_Summary_Details_dataGridView1.Columns[7].HeaderText = "SYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[8].HeaderText = "EYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[9].HeaderText = "Stat Amt";
                Student_Bill_Summary_Details_dataGridView1.Columns[10].HeaderText = "Other Amt";
                Student_Bill_Summary_Details_dataGridView1.Columns[11].HeaderText = "Total";
                Student_Bill_Summary_Details_dataGridView1.Columns[1].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[2].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[3].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[4].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[5].Width = 320;
                Student_Bill_Summary_Details_dataGridView1.Columns[6].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[7].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[8].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[9].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[10].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[11].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void Fill_GridOS()
        {
            try
            {
                query = "select * from Other_School_Bill_Master_Table where Admission_No='" + Admis_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Bill_Summary_Details_dataGridView1.DataSource = dt;
                Student_Bill_Summary_Details_dataGridView1.Columns[1].HeaderText = "SBill No";
                Student_Bill_Summary_Details_dataGridView1.Columns[2].HeaderText = "Bill Date";
                Student_Bill_Summary_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Student_Bill_Summary_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Student_Bill_Summary_Details_dataGridView1.Columns[5].HeaderText = "Std Name";
                Student_Bill_Summary_Details_dataGridView1.Columns[6].HeaderText = "Admis No";
                Student_Bill_Summary_Details_dataGridView1.Columns[7].HeaderText = "SYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[8].HeaderText = "EYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[9].HeaderText = "AMount";
                Student_Bill_Summary_Details_dataGridView1.Columns[10].HeaderText = "Total";
                Student_Bill_Summary_Details_dataGridView1.Columns[1].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[2].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[3].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[4].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[5].Width = 320;
                Student_Bill_Summary_Details_dataGridView1.Columns[6].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[7].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[8].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[9].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[10].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_GridOH()
        {
            try
            {
                query = "select * from Other_Hostel_Bill_Master_Table where Admission_No='" + Admis_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Bill_Summary_Details_dataGridView1.DataSource = dt;
                Student_Bill_Summary_Details_dataGridView1.Columns[1].HeaderText = "SBill No";
                Student_Bill_Summary_Details_dataGridView1.Columns[2].HeaderText = "Bill Date";
                Student_Bill_Summary_Details_dataGridView1.Columns[3].HeaderText = "Class";
                Student_Bill_Summary_Details_dataGridView1.Columns[4].HeaderText = "Section";
                Student_Bill_Summary_Details_dataGridView1.Columns[5].HeaderText = "Std Name";
                Student_Bill_Summary_Details_dataGridView1.Columns[6].HeaderText = "Admis No";
                Student_Bill_Summary_Details_dataGridView1.Columns[7].HeaderText = "SYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[8].HeaderText = "EYear";
                Student_Bill_Summary_Details_dataGridView1.Columns[9].HeaderText = "Deposit";
                Student_Bill_Summary_Details_dataGridView1.Columns[10].HeaderText = "Main Type";
                Student_Bill_Summary_Details_dataGridView1.Columns[11].HeaderText = "Main Amt";
                Student_Bill_Summary_Details_dataGridView1.Columns[12].HeaderText = "Total";
                Student_Bill_Summary_Details_dataGridView1.Columns[1].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[2].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[3].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[4].Width = 120;
                Student_Bill_Summary_Details_dataGridView1.Columns[5].Width = 320;
                Student_Bill_Summary_Details_dataGridView1.Columns[6].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[7].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[8].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[9].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[10].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[11].Width = 200;
                Student_Bill_Summary_Details_dataGridView1.Columns[12].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void SYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Class_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Sec_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Sec_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Sec_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Student_Name_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Student_Name_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Student_Name_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Bill_Type_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Bill_Type_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Bill_Type_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Student_Name_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (SYear_CBox.SelectedIndex == last)
            {
                try
                {
                    query = "select Admission_No from Student_Admission_Master_Table where Std_Name='" + Student_Name_CBox.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                    con.Open();
                    SqlCommand cmd = new SqlCommand(query, con);
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        Admis_No_Txt.Text = dr["Admission_No"].ToString();
                    }
                    dr.Close();
                    con.Close();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                try
                {
                    query = "select Admission_No from Academy_Year_Wise_Student_Admission_Master_Table where Std_Name='" + Student_Name_CBox.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                    con.Open();
                    SqlCommand cmd = new SqlCommand(query, con);
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        Admis_No_Txt.Text = dr["Admission_No"].ToString();
                    }
                    dr.Close();
                    con.Close();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                fill_Section_CBox();
                if (SYear_CBox.SelectedIndex == last)
                {
                    CFill_Std_Name();
                }
                else
                {
                    Fill_Std_Name();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }   
        }

        private void Sec_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (SYear_CBox.SelectedIndex == last)
            {
                CFill_Std_Name();
            }
            else
            {
                Fill_Std_Name();
            }
        }

        public void Fill_Std_Name()
        {
            try
            {
                Student_Name_CBox.Items.Clear();
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                query = "select Std_Name from Academy_Year_Wise_Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Student_Name_CBox.Items.Add(dr["Std_Name"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void CFill_Std_Name()
        {
            try
            {
                Student_Name_CBox.Items.Clear();
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                query = "select Std_Name from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Student_Name_CBox.Items.Add(dr["Std_Name"].ToString());
                }
                con.Close();
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
            Fill_Std_Name();
        }

        private void Bill_Type_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (Bill_Type_CBox.SelectedIndex == 0)
                {
                    Fill_GridS();
                }
                else if (Bill_Type_CBox.SelectedIndex == 1)
                {
                    Fill_GridH();
                }
                else if (Bill_Type_CBox.SelectedIndex == 2)
                {
                    Fill_GridV();
                }
                else if (Bill_Type_CBox.SelectedIndex == 3)
                {
                    Fill_GridST();
                }
                else if (Bill_Type_CBox.SelectedIndex == 4)
                {
                    Fill_GridOS();
                }
                else
                {
                    Fill_GridOH();
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

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (Bill_Type_CBox.SelectedIndex == 0)
                {
                    Fill_GridS();
                }
                else if (Bill_Type_CBox.SelectedIndex == 1)
                {
                    Fill_GridH();
                }
                else if (Bill_Type_CBox.SelectedIndex == 2)
                {
                    Fill_GridV();
                }
                else if (Bill_Type_CBox.SelectedIndex == 3)
                {
                    Fill_GridST();
                }
                else if (Bill_Type_CBox.SelectedIndex == 4)
                {
                    Fill_GridOS();
                }
                else
                {
                    Fill_GridOH();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Student_Bill_Summary_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }     
    }
}
